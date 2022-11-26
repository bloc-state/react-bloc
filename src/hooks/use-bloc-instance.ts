import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useContext } from "react"
import { getBlocContext } from "../context/context"

export const useBlocInstance = <B extends BlocBase<any>>(
  bloc: ClassType<B>,
): B => {
  const blocContext = getBlocContext(bloc.name)

  if (!blocContext) {
    throw new Error(
      `Context does not exist for ${bloc.name} in the current provider`,
    )
  }

  const blocInstance = useContext(blocContext.context).resolve(bloc)

  return blocInstance
}
