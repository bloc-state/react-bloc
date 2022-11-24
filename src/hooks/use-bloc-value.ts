import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useObservableState } from "observable-hooks"
import { StateType } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export const useBlocValue = <B extends BlocBase<any>>(
  bloc: ClassType<B>,
): ReturnType<() => StateType<B>> => {
  const providedBloc = useBlocInstance(bloc)
  const state = useObservableState(providedBloc.state$, providedBloc.state)
  return state
}
