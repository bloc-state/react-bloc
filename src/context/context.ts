import { AwilixContainer } from "awilix"
import { Context } from "react"

export type BlocContext = {
  context: Context<AwilixContainer>
  container: AwilixContainer
}

const blocContextMap = new Map<string, BlocContext>()

export const hasBlocContext = (scope: string) => blocContextMap.has(scope)

export const getBlocContext = (scope: string) => blocContextMap.get(scope)

export const addBlocContext = (scope: string, context: BlocContext) =>
  blocContextMap.set(scope, context)

export const removeBlocContext = (context: BlocContext) => {
  for (const [key, val] of blocContextMap.entries()) {
    if (val === context) {
      blocContextMap.delete(key)
    }
  }
}

export const clearBlocContext = () => blocContextMap.clear()
