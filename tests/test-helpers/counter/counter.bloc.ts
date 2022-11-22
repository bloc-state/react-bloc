import { Bloc } from "@bloc-state/bloc"
import { Disposable } from "tsyringe"
import {
  CounterEvent,
  DecrementCounterEvent,
  IncrementCounterEvent,
} from "./counter.event"
import { CounterState } from "./counter.state"

export class CounterBloc
  extends Bloc<CounterEvent, CounterState>
  implements Disposable
{
  constructor() {
    super(new CounterState(0))

    this.on(IncrementCounterEvent, (_, emit) =>
      emit(this.state.ready((data) => data + 1)),
    )

    this.on(DecrementCounterEvent, (_, emit) =>
      emit(this.state.ready((data) => data - 1)),
    )
  }

  dispose(): void {
    this.close()
  }
}
