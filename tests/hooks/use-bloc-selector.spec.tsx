import "reflect-metadata"
import { cleanup, renderHook } from "@testing-library/react"
import { clearBlocContext } from "../../src/context/context"
import { useBlocSelector } from "../../src"
import { UserBloc } from "../test-helpers"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import {
  blocUserWrapper as buw,
  cubitCounterWrapper as ccw,
} from "../test-helpers/wrappers"
import { AwilixContainer, createContainer } from "awilix"

describe("useBlocSelector", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element
  let blocUserWrapper: ({ children }: any) => JSX.Element
  let container: AwilixContainer

  beforeEach(() => {
    cubitCounterWrapper = ccw
    blocUserWrapper = buw
    container = createContainer()
  })

  afterEach(() => {
    clearBlocContext()
    cleanup()
    container.dispose()
  })

  it("should return derived state for non loadable State types", () => {
    expect.assertions(1)
    const { result } = renderHook(
      () =>
        useBlocSelector(CounterCubit, {
          selector: (state) => ({
            randomProp: state,
          }),
        }),
      { wrapper: cubitCounterWrapper },
    )
    expect(result.current.randomProp).toBe(0)
  })

  it("should return derived state", () => {
    expect.assertions(1)
    const { result } = renderHook(
      () =>
        useBlocSelector(UserBloc, {
          selector: (state) => state.age,
        }),
      { wrapper: blocUserWrapper },
    )

    expect(result.current).toBe(0)
  })
})
