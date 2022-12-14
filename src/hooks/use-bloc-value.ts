import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableState } from "observable-hooks"
import { StateType, UseBlocConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export const useBlocValue = <B extends BlocBase<any>>(
  bloc: ClassType<B>,
  config?: UseBlocConfig,
): ReturnType<() => StateType<B>> => {
  const providedBloc = useBlocInstance(bloc, config?.scope)
  const state = useObservableState(providedBloc.state$, providedBloc.state)
  return state
}
