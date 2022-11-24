import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableEagerState } from "observable-hooks"
import { filter, mergeWith } from "rxjs"
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

  const get: BlocResolver = (blocClass) => {
    return useBlocInstance(blocClass)
  }

  if (isMultiBlocListener(_props)) {
    const state$ = _props.bloc.map((bloc) => useBlocInstance(bloc).state$)

    const mergedStream$ = state$
      .reduce((a, b) => a.pipe(mergeWith(b)))
      .pipe(filter((state) => listenWhen(get, state)))

    const state = useObservableEagerState(mergedStream$)

    props.listen(get, state)
  } else {
    const bloc = props.bloc as ClassType<BlocBase<State>>
    const state$ = useBlocInstance(bloc).state$.pipe(
      filter((state) => listenWhen(get, state)),
    )

    const state = useObservableEagerState(state$)

    props.listen(get, state)
  }

  return <>{props.children}</>
}
