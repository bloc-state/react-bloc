import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableEagerState } from "observable-hooks"
import { useLayoutEffect } from "react"
import { filter, mergeWith, Observable } from "rxjs"
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
    const states$: Observable<any>[] = []

    _props.bloc.forEach((blocClass) => {
      const instance = useBlocInstance(blocClass)
      states$.push(instance.state$)
    })

    const get: BlocResolver = (blocClass) => {
      const blocContext = getBlocContext(blocClass.name)

      if (!blocContext) {
        throw new Error(
          `BlocListener: bloc listener could not find context "${blocClass.name}"`,
        )
      }

      return blocContext.container.resolve(blocClass)
    }

    const mergedStream$ = states$
      .reduce((a, b) => a.pipe(mergeWith(b)))
      .pipe(filter((state) => listenWhen(get, state)))

    const state = useObservableEagerState(mergedStream$)

    useLayoutEffect(() => {
      props.listen(get, state)
    }, [state])
  } else {
    const bloc = props.bloc as ClassType<BlocBase<State>>

    const blocContext = getBlocContext(bloc.name)

    if (!blocContext) {
      throw new Error(
        `BlocListener: bloc listener could not find context "${bloc.name}"`,
      )
    }

    const get: BlocResolver = (blocClass) => {
      const blocContext = getBlocContext(blocClass.name)
      if (!blocContext) {
        throw new Error(
          `BlocListener.listener(get): bloc listener could not find context "${blocClass.name}"`,
        )
      }

      return blocContext.container.resolve(blocClass)
    }

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
