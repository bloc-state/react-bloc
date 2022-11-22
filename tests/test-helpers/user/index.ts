import { BlocEvent, Bloc } from "@bloc-state/bloc"
import { State } from "@bloc-state/state"

import { Disposable } from "tsyringe"
import { delay } from "../counter/delay"

export interface User {
  name: {
    first: string
    last: string
  }
  age: number
}

export class UserState extends State<User> {}

export class UserEvent extends BlocEvent {}

export class UserLastNameChangedEvent extends UserEvent {}

export class UserNameChangedEvent extends UserEvent {
  constructor(public name: { first: string; last: string }) {
    super()
  }
}

export class UserLastNameAsyncChangedEvent extends UserEvent {}

export class UserAgeChangedEvent extends UserEvent {
  constructor(public age: number) {
    super()
  }
}

export class UserBloc extends Bloc<UserEvent, UserState> implements Disposable {
  constructor() {
    const initialData = { name: { first: "", last: "" }, age: 0 }

    super(new UserState(initialData))

    this.on(UserLastNameChangedEvent, async (event, emit) => {
      await delay(300)
      emit((state) =>
        state.ready((user) => {
          user.name.last = "parker"
        }),
      )
    })

    this.on(UserLastNameAsyncChangedEvent, async (event, emit) => {
      emit((state) => state.loading())
      await delay(1000)
      emit((state) =>
        state.ready((user) => {
          user.name.last = "richards"
        }),
      )
    })

    this.on(UserNameChangedEvent, (event, emit) =>
      emit((state) =>
        state.ready((user) => {
          user.name = event.name
        }),
      ),
    )

    this.on(UserAgeChangedEvent, (event, emit) =>
      emit((state) =>
        state.ready((user) => {
          user.age = this.state.data.age + 1
        }),
      ),
    )
  }

  dispose(): void {
    this.close()
  }
}

export * from "./components"
