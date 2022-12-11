import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useContext } from "react"
import { getBlocContext } from "../context/context"

export const useBlocInstance = <B extends BlocBase<any>>(
  bloc: ClassType<B>,
  scope?: string,
): B => {
  const name = scope ? `${scope}-${bloc.name}` : bloc.name
  const blocContext = getBlocContext(name)

  if (!blocContext) {
    throw new Error(
      `Context does not exist for ${name} in the current provider`,
    )
  }

  const blocInstance = useContext(blocContext.context).resolve(name)

  return blocInstance
}
