import { Context } from "react"
import { DependencyContainer } from "tsyringe"

export type BlocContext = Context<DependencyContainer>

const blocContextMap = new Map<string, BlocContext>()

export const getBlocContext = (scope: string) => {
  return blocContextMap.get(scope)
}

export const addBlocContext = (scope: string, context: BlocContext) => {
  return blocContextMap.set(scope, context)
}

export const removeBlocContext = (context: BlocContext) => {
  for (const [key, val] of blocContextMap.entries()) {
    if (val === context) {
      blocContextMap.delete(key)
    }
  }
}

export const clearBlocContext = () => {
  return blocContextMap.clear()
}
