import "reflect-metadata"
import { cleanup, render } from "@testing-library/react"
import { UserBloc, UserMultiBlocProvider } from "../test-helpers"
import { addBlocContext, clearBlocContext } from "../../src/context/context"
import { createContext } from "react"
import { AwilixContainer, createContainer } from "awilix"

describe("BlocProvider", () => {
  const originalConsoleError = console.error
  let container: AwilixContainer

  beforeEach(() => {
    container = createContainer()
    console.error = () => {}
  })

  afterEach(() => {
    console.error = originalConsoleError
    cleanup()
    clearBlocContext()
    container.dispose()
  })

  it("should throw an error if a provided bloc already exists in contextMap", async () => {
    const blocContext = createContext(container)
    blocContext.displayName = UserBloc.name
    addBlocContext(UserBloc.name, {
      context: blocContext,
      container: container,
    })

    expect(() => {
      render(UserMultiBlocProvider())
    }).toThrow()
  })
})
