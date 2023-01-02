import { AwilixContainer, createContainer } from "awilix"
import { clearBlocContext } from "../../src/context"
import { cleanup } from "@testing-library/react"
import { getRegistrations, registerModules } from "../../src"
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
    const registrations = getRegistrations()

    expect(registrations["UserApi"]).toBeDefined()
  })
})
