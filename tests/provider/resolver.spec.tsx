import { asClass, AwilixContainer, createContainer } from "awilix"
import { addBlocContext, clearBlocContext } from "../../src/context"
import { resolver } from "../../src/context/resolver"
import { CounterBloc } from "../test-helpers"
import { cleanup } from "@testing-library/react"

describe("BlocResolver", () => {
  let container: AwilixContainer

  beforeEach(() => {
    container = createContainer()
  })

  afterEach(() => {
    cleanup()
    clearBlocContext()
    container.dispose()
  })

  it("should throw an error if it doesn't find context for a Bloc", async () => {
    expect(() => resolver(CounterBloc)).toThrow(
      'BlocResolver: could not find context "CounterBloc"',
    )
  })

  it("should resolve scoped blocs", async () => {
    container.register("test-CounterBloc", asClass(CounterBloc))
    addBlocContext("test-CounterBloc", {
      container,
      context: {} as React.Context<AwilixContainer>,
    })
    expect(resolver(CounterBloc, "test")).toBeInstanceOf(CounterBloc)
  })
})
