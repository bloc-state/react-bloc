import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useContext } from "react"
import { getBlocContext } from "../provider/context"

export const useBlocInstance = <B extends BlocBase<any>>(
  bloc: ClassType<B>,
): B => {
  const context = getBlocContext(bloc.name)

  if (!context) {
    throw new Error(
      `Context does not exist for ${bloc.name} in the current provider`,
    )
  }

  const blocInstance = useContext(context).resolve(bloc)

  return blocInstance
}
