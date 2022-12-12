import { cleanup, renderHook } from "@testing-library/react"
import { cubitCounterWrapper as ccw } from "../test-helpers/wrappers"
import { useSetBloc } from "../../src"
import { clearBlocContext } from "../../src/context/context"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import { AwilixContainer, createContainer } from "awilix"

describe("useSetBloc", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element
  let container: AwilixContainer

  beforeEach(() => {
    cubitCounterWrapper = ccw
    container = createContainer()
  })

  afterEach(() => {
    clearBlocContext()
    cleanup()
    container.dispose()
  })

  it("should return the emit method of a bloc", () => {
    expect.assertions(1)
    const { result } = renderHook(() => useSetBloc(CounterCubit), {
      wrapper: cubitCounterWrapper,
    })
    expect(result.current).toBeInstanceOf(Function)
  })
})
