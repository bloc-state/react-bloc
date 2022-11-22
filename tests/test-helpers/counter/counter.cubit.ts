import { Cubit } from "@bloc-state/bloc"
import { Disposable } from "tsyringe"

export default class CounterCubit extends Cubit<number> implements Disposable {
  constructor() {
    super(0)
  }

  increment = () => this.emit((data) => data + 1)

  decrement = () => this.emit((data) => data - 1)

  dispose() {
    this.close()
  }
}
