import "reflect-metadata"
import { cleanup, render } from "@testing-library/react"
import { UserBloc, UserMultiBlocProvider } from "../test-helpers"
import { addBlocContext, clearBlocContext } from "../../src/provider/context"
import { createContext } from "react"
import { container as parentContainer } from "tsyringe"

describe("BlocProvider", () => {
  const originalConsoleError = console.error

  beforeEach(() => {
    parentContainer.reset()
    console.error = () => {}
  })

  afterEach(() => {
    console.error = originalConsoleError
    cleanup()
    clearBlocContext()
  })

  it("should throw an error if a provided bloc already exists in contextMap", async () => {
    const blocContext = createContext(parentContainer)
    blocContext.displayName = UserBloc.name
    addBlocContext(UserBloc.name, blocContext)

    expect(() => {
      render(UserMultiBlocProvider())
    }).toThrow()
  })
})
