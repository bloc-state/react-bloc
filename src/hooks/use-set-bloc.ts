import {
  ClassType,
  StateType,
  EmitUpdaterCallback,
  Cubit,
} from "@bloc-state/bloc"
import { useBlocInstance } from "./use-bloc-instance"

export const useSetBloc = <B extends Cubit<any>>(
  bloc: ClassType<B>,
): ReturnType<
  () => (state: StateType<B> | EmitUpdaterCallback<StateType<B>>) => void
> => {
  const providedBloc = useBlocInstance(bloc)
  return providedBloc.emit
}
