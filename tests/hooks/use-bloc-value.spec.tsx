import "reflect-metadata"
import { cubitCounterWrapper as ccw } from "../test-helpers/wrappers"
import { clearBlocContext } from "../../src/context/context"
import { cleanup, renderHook } from "@testing-library/react"
import { useBlocValue } from "../../src"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import { container } from "tsyringe"

describe("useBlocValue", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element

  beforeEach(() => {
    clearBlocContext()
    cubitCounterWrapper = ccw
  })

  afterAll(() => {
    container.reset()
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
