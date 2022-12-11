import { AwilixContainer } from "awilix"
import { Suspense } from "react"
import {
  UserBloc,
  UserBlocListenerEvent,
  UserLastNameAsyncChangedEvent,
  UserMultiBlocListenerEvent,
} from "../user"
import { BlocProvider } from "../../../../src"
import { BlocListener } from "../../../../src/components/bloc-listener/listener"
import CounterCubit from "../../counter/counter.cubit"
import { UserBlocConsumer } from "./user-bloc-consumer"

export const UserMultiBlocListenerProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc, CounterCubit]}
    container={container}
    onCreate={(get) =>
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }
  >
    <BlocListener
      bloc={CounterCubit}
      listener={(get, state) => {
        get(UserBloc).add(new UserMultiBlocListenerEvent(state))
      }}
    >
      <UserBlocConsumer />
    </BlocListener>
  </BlocProvider>
)

export const UserSingleBlocListenerProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc]}
    container={container}
    onCreate={(get) =>
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }
  >
    <BlocListener
      bloc={UserBloc}
      listener={(get, state) => {
        get(UserBloc).add(new UserBlocListenerEvent())
      }}
    >
      <UserBlocConsumer suspend={false} />
    </BlocListener>
  </BlocProvider>
)

export const UserBlocProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc]}
    container={container}
    onCreate={(get) =>
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer />
    </Suspense>
  </BlocProvider>
)

export const UserMultiBlocProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc, CounterCubit]}
    container={container}
    onCreate={(get) =>
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer />
    </Suspense>
  </BlocProvider>
)
