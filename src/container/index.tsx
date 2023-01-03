import { BlocModule } from "../types"

import { createContainer } from "awilix"

const rootContainer = createContainer()

export const createChildContainer = () => rootContainer.createScope()

export const getRegistrations = () => rootContainer.registrations

export const registerModules = (modules: BlocModule[]) =>
  modules.forEach((module) => module(rootContainer))
