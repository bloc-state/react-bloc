import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableEagerState } from "observable-hooks"
import { StateType, UseBlocSelectorConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"
import { useBlocSelector } from "./use-bloc-selector"

export function useBloc<B extends BlocBase<any>, P = StateType<B>>(
  bloc: ClassType<B>,
  config?: UseBlocSelectorConfig<B, P>,
): ReturnType<() => [P, B]> {
  const providedBloc = useBlocInstance(bloc, config?.scope)
  if (config?.selector) {
    return [useBlocSelector(bloc, config), providedBloc]
  } else {
    return [useObservableEagerState(providedBloc.state$), providedBloc]
  }
}
