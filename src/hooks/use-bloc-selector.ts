import { BlocBase, ClassType } from "@bloc-state/bloc"
import { isStateInstance } from "@bloc-state/state"
import {
  ObservableResource,
  useObservableEagerState,
  useObservableSuspense,
} from "observable-hooks"
import { useMemo } from "react"
import { filter, map, Observable } from "rxjs"
import { SelectorStateType, StateType, UseBlocSelectorConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export function useBlocSelector<P, B extends BlocBase<any>>(
  bloc: ClassType<B>,
  config: UseBlocSelectorConfig<B, P>,
): P {
  const providedBloc = useBlocInstance(bloc)
  const isState = isStateInstance(providedBloc.state)
  const selector = config.selector
  const suspend = config.suspend ?? false
  const listenWhen = config.listenWhen ?? (() => true)

  const listenWhenState$ = useMemo(() => {
    return providedBloc.state$.pipe(filter(listenWhen))
  }, [])

  const selectedState$ = isState
    ? useMemo(() => {
        return listenWhenState$.pipe(
          map((state) => {
            const _state = state as SelectorStateType<B>
            return selector(_state.data)
          }),
        )
      }, [])
    : useMemo(() => {
        return listenWhenState$.pipe(
          map((state) => {
            const _state = state as SelectorStateType<B>
            return selector(_state)
          }),
        )
      }, [])

  if (suspend) {
    return useBlocSuspense(listenWhenState$, config)
  } else {
    return useObservableEagerState(selectedState$)
  }
}

function useBlocSuspense<P, B extends BlocBase<any>>(
  state$: Observable<any>,
  config: UseBlocSelectorConfig<B, P>,
) {
  const selector = config.selector
  const suspendWhen =
    config.suspendWhen ??
    ((state) => (isStateInstance(state) ? state.status !== "loading" : true))

  const resource = useMemo(() => {
    return new ObservableResource(state$, (value) => suspendWhen(value))
  }, [])

  const state = useObservableSuspense(resource) as StateType<B>

  return selector(isStateInstance(state) ? state.data : state)
}
