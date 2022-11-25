import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableEagerState } from "observable-hooks"
import { useCallback, useContext, useLayoutEffect, useMemo } from "react"
import { filter, mergeWith } from "rxjs"
import { getBlocContext } from "../../context"
import { useBlocInstance } from "../../hooks"
import {
  BlocListenerProps,
  BlocResolver,
  isMultiBlocListener,
} from "../../types"

export function BlocListener<State = any>(
  props: React.PropsWithChildren<BlocListenerProps<State>>,
) {
  const _props = props as BlocListenerProps<State>
  const listenWhen = props.listenWhen ?? (() => true)

  if (isMultiBlocListener(_props)) {
    const names = useMemo(() => {
      return _props.bloc
        .map((bloc) => bloc.name)
        .sort()
        .join("-")
    }, [])

    const state$ = _props.bloc.map((bloc) => useBlocInstance(bloc).state$)
    const context = getBlocContext(names)

    if (!context) {
      throw new Error(
        `BlocListener: multibloc listener could not find context "${names}"`,
      )
    }

    const container = useContext(context)

    const get: BlocResolver = useCallback((blocClass) => {
      return container.resolve(blocClass)
    }, [])

    const mergedStream$ = state$
      .reduce((a, b) => a.pipe(mergeWith(b)))
      .pipe(filter((state) => listenWhen(get, state)))

    const state = useObservableEagerState(mergedStream$)

    useLayoutEffect(() => {
      props.listen(get, state)
    }, [state])
  } else {
    const bloc = props.bloc as ClassType<BlocBase<State>>

    const context = getBlocContext(bloc.name)

    if (!context) {
      throw new Error(
        `BlocListener: bloc listener could not find context "${bloc.name}"`,
      )
    }

    const container = useContext(context)

    const get: BlocResolver = useCallback((blocClass) => {
      return container.resolve(blocClass)
    }, [])

    const state$ = useBlocInstance(bloc).state$.pipe(
      filter((state) => listenWhen(get, state)),
    )

    const state = useObservableEagerState(state$)

    useLayoutEffect(() => {
      props.listen(get, state)
    }, [state])
  }

  return <>{props.children}</>
}
