import { getBlocContext } from "."
import { BlocResolver } from "../types"

export const resolver: BlocResolver = (blocClass, scope) => {
  const name = scope ? `${scope}-${blocClass.name}` : blocClass.name
  const blocContext = getBlocContext(name)

  if (!blocContext) {
    throw new Error(`BlocResolver: could not find context "${blocClass.name}"`)
  }

  return blocContext.container.resolve(name)
}
