import "reflect-metadata"
import { cubitCounterWrapper as ccw } from "../test-helpers/wrappers"
import { clearBlocContext } from "../../src/context/context"
import { cleanup, renderHook } from "@testing-library/react"
import { useBlocValue } from "../../src"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import { AwilixContainer, createContainer } from "awilix"

describe("useBlocValue", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element
  let container: AwilixContainer

  beforeEach(() => {
    clearBlocContext()
    cubitCounterWrapper = ccw
    container = createContainer()
  })

  afterAll(() => {
    container.dispose()
  })

  afterEach(() => {
    clearBlocContext()
    cleanup()
  })

  it("should return the current state of a bloc", () => {
    expect.assertions(1)
    const { result } = renderHook(() => useBlocValue(CounterCubit), {
      wrapper: cubitCounterWrapper,
    })
    expect(result.current).toBe(0)
  })
})
