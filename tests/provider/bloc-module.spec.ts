import { AwilixContainer, createContainer } from "awilix"
import { clearBlocContext } from "../../src/context"
import { cleanup } from "@testing-library/react"
import { registerModules, rootContainer } from "../../src"
import { UserModule } from "../test-helpers/user/user-module"
import { CounterModule } from "../test-helpers/counter/counter-module"

describe("BlocModule", () => {
  let container: AwilixContainer

  beforeEach(() => {
    container = createContainer()
  })

  afterEach(() => {
    cleanup()
    clearBlocContext()
    container.dispose()
  })

  it("register multiple modules", async () => {
    registerModules([UserModule, CounterModule])
    const registrations = rootContainer.registrations

    expect(registrations["UserApi"]).toBeDefined()
  })
})
