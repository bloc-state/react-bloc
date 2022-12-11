import "reflect-metadata"
import { cleanup, render, waitFor } from "@testing-library/react"
import {
  UserMultiBlocListenerProvider,
  UserSingleBlocListenerProvider,
} from "../test-helpers"
import { clearBlocContext } from "../../src/context/context"
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

  it("should listenTo states when single bloc listener", () => {
    const { getByText } = render(UserSingleBlocListenerProvider())

    waitFor(
      () => {
        getByText("bloc-listener")
      },
      {
        timeout: 2000,
      },
    )
  })

  it("should listenTo states with multi bloc listener", () => {
    const { getByText } = render(UserMultiBlocListenerProvider())

    waitFor(
      () => {
        getByText("multi-bloc-listener")
      },
      {
        timeout: 2000,
      },
    )
  })
})
