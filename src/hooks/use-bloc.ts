import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableState } from "observable-hooks"
import { UseBlocConfig, UseBlocSelectorConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"
import { useBlocSelector } from "./use-bloc-selector"

export function useBloc<P, B extends BlocBase<any>>(
  bloc: ClassType<B>,
  config?: UseBlocSelectorConfig<B, P> & UseBlocConfig,
): ReturnType<() => [P, B]> {
  const providedBloc = useBlocInstance(bloc, config?.scope)
  if (config?.selector) {
    return [useBlocSelector(bloc, config), providedBloc]
  } else {
    return [
      useObservableState(providedBloc.state$, providedBloc.state),
      providedBloc,
    ]
  }
}
