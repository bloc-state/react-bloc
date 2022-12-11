import "reflect-metadata"
import { createContext } from "react"
import {
  BlocContext,
  addBlocContext,
  getBlocContext,
  removeBlocContext,
} from "../../src/context/context"
import { AwilixContainer, createContainer } from "awilix"

describe("BlocContextGlobalMap", () => {
  let blocContext: BlocContext
  let container: AwilixContainer

  beforeEach(() => {
    container = createContainer()
    const context = createContext(container)
    context.displayName = "test"
    blocContext = {
      context,
      container: container,
    }
    addBlocContext("test", blocContext)
  })

  afterAll(() => {
    container.dispose()
  })

  it("should remove all context from the blocContextMap", () => {
    expect(getBlocContext("test")).toBeDefined()
    removeBlocContext(blocContext)
    expect(getBlocContext("test")).toBeUndefined()
  })
})
