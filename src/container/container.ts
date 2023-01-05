import { BlocModule } from "../types"

import { createContainer } from "awilix"

export const rootContainer = createContainer()

export const registerModules = (modules: BlocModule[]) =>
  modules.forEach((module) => module(rootContainer))
