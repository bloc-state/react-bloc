import { cleanup, render, renderHook } from "@testing-library/react"
import "@testing-library/jest-dom"
import {  useBlocInstance } from "../../src"
import { clearBlocContext } from "../../src/context/context"
import {
  cubitCounterWrapper as ccw,
  blocUserWrapper as buw,
} from "../test-helpers/wrappers"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import { CounterBlocConsumer } from "../test-helpers/counter/components/counter-cubit-consumer"
import { AwilixContainer, createContainer } from "awilix"

describe("useBlocInstance", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element
  let blocUserWrapper: ({ children }: any) => JSX.Element
  let container: AwilixContainer
  const originalConsoleError = console.error

  beforeEach(() => {
    console.error = () => {}
    cubitCounterWrapper = ccw
    blocUserWrapper = buw
    container = createContainer()
  })

  afterEach(() => {
    console.error = originalConsoleError
    clearBlocContext()
    cleanup()
  })

  afterAll(() => {
    container.dispose()
  })

  it("should return an instance of a bloc created by a BlocProvider", () => {
    expect.assertions(1)
    const { result } = renderHook(() => useBlocInstance(CounterCubit), {
      wrapper: cubitCounterWrapper,
    })

    expect(result.current).toBeInstanceOf(CounterCubit)
  })

  it("should throw an error if a bloc does not exist in the providers context", () => {
    expect.assertions(1)
    const resultTest = () => {
      render(<CounterBlocConsumer />, {
        wrapper: blocUserWrapper,
      })
    }
    expect(resultTest).toThrow()
  })

})
