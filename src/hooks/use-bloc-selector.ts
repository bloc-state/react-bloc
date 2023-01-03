import { BlocBase, ClassType } from "@bloc-state/bloc"
import { isStateInstance } from "@bloc-state/state"
import {
  ObservableResource,
  useObservable,
  useObservableEagerState,
  useObservableSuspense,
} from "observable-hooks"
import { useMemo } from "react"
import { filter, map, Observable, tap } from "rxjs"
import { SelectorStateType, StateType, UseBlocSelectorConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export function useBlocSelector<P, B extends BlocBase<any>>(
  bloc: ClassType<B>,
  config: UseBlocSelectorConfig<B, P>,
): P {
  const providedBloc = useBlocInstance(bloc, config.scope)
  const isState = isStateInstance(providedBloc.state)
  const selector = config.selector
  const listenWhen = config.listenWhen ?? useMemo(() => () => true, [])

  const listenWhenState$ = useObservable(() => {
    return providedBloc.state$.pipe(filter(listenWhen))
  })

  const errorWhenState$ = useObservable(() => {
    return listenWhenState$.pipe(
      tap((state) => {
        if (config.errorWhen && config.errorWhen(state)) {
          throw new BlocRenderError(state)
        }
      }),
    )
  })

  if (config.suspendWhen) {
    return useBlocSuspense(errorWhenState$, config)
  } else {
    const selectedState$ = isState
      ? useObservable(() => {
          return errorWhenState$.pipe(
            map((state) => {
              const _state = state as SelectorStateType<B>
              return selector(_state.data)
            }),
          )
        })
      : useObservable(() => {
          return errorWhenState$.pipe(
            map((state) => {
              const _state = state as SelectorStateType<B>
              return selector(_state)
            }),
          )
        })

    return useObservableEagerState(selectedState$)
  }
}

function useBlocSuspense<P, B extends BlocBase<any>>(
  state$: Observable<any>,
  config: UseBlocSelectorConfig<B, P>,
) {
  const selector = config.selector
  const suspendWhen = config.suspendWhen!

  const resource = useMemo(() => {
    return new ObservableResource(state$, (value) => !suspendWhen(value))
  }, [])

  const state = useObservableSuspense(resource) as StateType<B>

  return selector(isStateInstance(state) ? state.data : state)
}

export class BlocRenderError<State> extends Error {
  constructor(public readonly state: State, reload?: () => void) {
    super("useBlocSelector: errorWhen triggered a new render Error")

    Object.setPrototypeOf(this, BlocRenderError.prototype)
  }
}
