import { cleanup, render, waitFor, screen } from "@testing-library/react"
import {
  UserSingleBlocListenerProvider,
} from "../test-helpers"
import {  clearBlocContext } from "../../src/context/context"
import { AwilixContainer, createContainer } from "awilix"

describe("BlocListener", () => {
  let container: AwilixContainer

  beforeEach(() => {
    container = createContainer()
  })

  afterEach(() => {
    cleanup()
    clearBlocContext()
    container.dispose()
  })

  it("should listen to states when single bloc listener", async () => {
    expect.assertions(1)
    render(UserSingleBlocListenerProvider(container))

    await waitFor(
      () => {
        screen.getByText("bloc-listener")
      },
      {
        timeout: 3000,
      },
    )

    expect(screen.getByTestId("test-name").textContent).toBe("bloc-listener")
  })
})
