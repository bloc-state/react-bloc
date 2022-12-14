import { ClassType, EmitUpdaterCallback, Cubit } from "@bloc-state/bloc"
import { StateType, UseBlocConfig } from "../types"
import { useBlocInstance } from "./use-bloc-instance"

export const useBlocSetValue = <B extends Cubit<any>>(
  bloc: ClassType<B>,
  config?: UseBlocConfig,
): ReturnType<
  () => (state: StateType<B> | EmitUpdaterCallback<StateType<B>>) => void
> => useBlocInstance(bloc, config?.scope).emit
