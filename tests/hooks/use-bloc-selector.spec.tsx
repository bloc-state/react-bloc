import "reflect-metadata"
import { act, cleanup, render, renderHook, waitFor } from "@testing-library/react"
import { clearBlocContext } from "../../src/provider/context"
import { container as rootContainer } from "tsyringe"
import { useBlocSelector } from "../../src"
import { UserBloc, UserBlocProvider, UserLastNameAsyncChangedEvent } from "../test-helpers"
import CounterCubit from "../test-helpers/counter/counter.cubit"
import {
  blocUserWrapper as buw,
  cubitCounterWrapper as ccw,
} from "../test-helpers/wrappers"

describe("useBlocSelector", () => {
  let cubitCounterWrapper: ({ children }: any) => JSX.Element
  let blocUserWrapper: ({ children }: any) => JSX.Element

  beforeEach(() => {
    cubitCounterWrapper = ccw
    blocUserWrapper = buw
  })

  afterEach(() => {
    clearBlocContext()
    cleanup()
    rootContainer.reset()
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

  it("should return derived state with suspense", async () => {
    expect.assertions(4)
    const container = rootContainer.createChildContainer()
    const { getByTestId } = render(UserBlocProvider(container))

    await waitFor(() => {
      const loading = getByTestId("test-loading")
      expect(loading.innerHTML).toBe("loading")
    })

    await waitFor(
      () => {
        getByTestId("test-loaded")
        expect(getByTestId("test-name").innerHTML).toBe("richards")
      },
      {
        timeout: 3000,
      },
    )

    const userBloc = container.resolve(UserBloc)

    act( () => {
      userBloc.add(new UserLastNameAsyncChangedEvent)
    })

    await waitFor(() => {
      const loading = getByTestId("test-loading")
      expect(loading.innerHTML).toBe("loading")
    })

    await waitFor(
      () => {
        getByTestId("test-loaded")
        expect(getByTestId("test-name").innerHTML).toBe("richards")
      },
      {
        timeout: 3000,
      },
    )

    container.dispose()
  })
})
