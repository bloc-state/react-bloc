import { AwilixContainer } from "awilix"
import { Suspense } from "react"
import { UserBloc, UserLastNameAsyncChangedEvent } from "../user"
import { BlocProvider } from "../../../../src"
import { BlocListener } from "../../../../src/components/bloc-listener/listener"
import { UserBlocConsumer, UserBlocConsumerWithScope } from "./user-bloc-consumer"
import CounterCubit from "../../counter/counter.cubit"

export const UserSingleBlocListenerProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc]}
    container={container}
    onCreate={(get) => {
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }}
  >
    <BlocListener
      bloc={UserBloc}
      listener={(get, state) => {
        get(UserBloc).add(new UserLastNameAsyncChangedEvent("bloc-listener"))
      }}
    >
      <UserBlocConsumer />
    </BlocListener>
  </BlocProvider>
)

export const UserBlocProvider = (container?: AwilixContainer, suspendWhen?: (state: any) => boolean) => (
  <BlocProvider
    bloc={[UserBloc]}
    container={container}
    onCreate={(get) =>
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }
  >
    <Suspense fallback={<div data-testid="test-loading">...loading</div>}>
      <UserBlocConsumer suspendWhen={suspendWhen} />
    </Suspense>
  </BlocProvider>
)

export const UserScopedBlocProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc]}
    container={container}
    scope="test"
    onCreate={ ( get ) => {
      get(UserBloc, "test").add(new UserLastNameAsyncChangedEvent("scoped-test"))
    }
    }
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumerWithScope />
    </Suspense>
  </BlocProvider>
)

export const UserMultiBlocProvider = (container?: AwilixContainer) => (
  <BlocProvider
    bloc={[UserBloc, CounterCubit]}
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent(""))}
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer />
    </Suspense>
  </BlocProvider>
)
