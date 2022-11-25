import { BlocBase, ClassType } from "@bloc-state/bloc"
import { State, isStateInstance } from "@bloc-state/state"
import {
  ObservableResource,
  useObservableEagerState,
  useObservableSuspense,
} from "observable-hooks"
import { useMemo } from "react"
import { filter, map, Observable } from "rxjs"
import { SelectorStateType, UseBlocSelectorConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export function useBlocSelector<P, B extends BlocBase<any>>(
  bloc: ClassType<B>,
  config: UseBlocSelectorConfig<B, P>,
): P {
  const providedBloc = useBlocInstance(bloc)
  const isState = isStateInstance(providedBloc.state)
  const selector = config.selector
  const suspend = config.suspend ?? true
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

  if (suspend && isState) {
    return useStateSuspense(listenWhenState$, config)
  } else {
    return useObservableEagerState(selectedState$)
  }
}

function useStateSuspense<P, B extends BlocBase<any>>(
  state$: Observable<State>,
  config: UseBlocSelectorConfig<B, P>,
) {
  const selector = config.selector

  const resource = useMemo(() => {
    return new ObservableResource(
      state$,
      (state: State<any>) => state.status !== "loading",
    )
  }, [])

  const state = useObservableSuspense(resource)

  return selector(state.data)
}
