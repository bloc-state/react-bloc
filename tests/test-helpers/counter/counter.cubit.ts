import { Cubit } from "@bloc-state/bloc"

export default class CounterCubit extends Cubit<number> {
  constructor() {
    super(0)
  }

  increment = () => this.emit((data) => data + 1)

  decrement = () => this.emit((data) => data - 1)

  dispose() {
    this.close()
  }
}
