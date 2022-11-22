import "reflect-metadata"
import { cleanup, renderHook } from "@testing-library/react"
import { cubitCounterWrapper as ccw } from "../test-helpers/wrappers"
import { useSetBloc } from "../../src"
import { clearBlocContext } from "../../src/provider/context"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import { container } from "tsyringe"

describe("useSetBloc", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element

  beforeEach(() => {
    cubitCounterWrapper = ccw
  })

  afterAll(() => {
    container.reset()
  })

  afterEach(() => {
    clearBlocContext()
    cleanup()
  })

  it("should return the emit method of a bloc", () => {
    expect.assertions(1)
    const { result } = renderHook(() => useSetBloc(CounterCubit), {
      wrapper: cubitCounterWrapper,
    })
    expect(result.current).toBeInstanceOf(Function)
  })
})
