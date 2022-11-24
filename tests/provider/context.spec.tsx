import "reflect-metadata"
import { createContext } from "react"
import { container } from "tsyringe"
import {
  BlocContext,
  addBlocContext,
  getBlocContext,
  removeBlocContext,
} from "../../src/context/context"

describe("BlocContextGlobalMap", () => {
  let blocContext: BlocContext

  beforeEach(() => {
    blocContext = createContext(container)
    blocContext.displayName = "test"
    addBlocContext("test", blocContext)
  })

  afterAll(() => {
    container.reset()
  })

  it("should remove all context from the blocContextMap", () => {
    expect(getBlocContext("test")).toBeDefined()
    removeBlocContext(blocContext)
    expect(getBlocContext("test")).toBeUndefined()
  })
})
