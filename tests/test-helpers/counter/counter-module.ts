import { asClass } from "awilix"
import { BlocModule } from "../../../src"

export type Counter = number

export abstract class CounterApi {
  abstract getCounterData(): Counter
}

export class CounterRemoteApiImpl implements CounterApi {
  getCounterData(): Counter {
    return 0
  }
}

export const CounterModule: BlocModule = (container) => {
  container.register(CounterApi.name, asClass(CounterRemoteApiImpl))
}
