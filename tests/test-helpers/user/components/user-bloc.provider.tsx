import { Suspense } from "react"
import { DependencyContainer } from "tsyringe"
import {
  UserBloc,
  UserBlocListenerEvent,
  UserLastNameAsyncChangedEvent,
  UserMultiBlocListenerEvent,
} from ".."
import { BlocProvider } from "../../../../src"
import { BlocListener } from "../../../../src/components/bloc-listener/listener"
import CounterCubit from "../../counter/counter.cubit"
import { UserBlocConsumer } from "./user-bloc-consumer"

export const UserMultiBlocListenerProvider = (container?: DependencyContainer) => (
  <BlocProvider
    bloc={[UserBloc, CounterCubit]}
    name="user-multi-bloc-provider"
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))}
  >
    <BlocListener
      bloc={[UserBloc, CounterCubit]}
      listen={(get, state) => {
        const count = state as number
        get(UserBloc).add(new UserMultiBlocListenerEvent(count))
      }}
      listenWhen={ ( get, state ) => {
        return typeof state === "number"
      }}
    >
      <UserBlocConsumer />
      </BlocListener>
  </BlocProvider>
)

export const UserSingleBlocListenerProvider = (
  container?: DependencyContainer,
) => (
  <BlocProvider
    bloc={UserBloc}
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))}
  >
    <BlocListener
      bloc={UserBloc}
      listen={(get, state) => {
        get(UserBloc).add(new UserBlocListenerEvent())
      }}
    >
      <UserBlocConsumer swr={false} suspend={false} />
    </BlocListener>
  </BlocProvider>
)

export const UserBlocProvider = (
  container?: DependencyContainer,
  swr?: boolean,
) => (
  <BlocProvider
    bloc={UserBloc}
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))}
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer swr={swr} />
    </Suspense>
  </BlocProvider>
)

export const UserMultiBlocProvider = (container?: DependencyContainer) => (
  <BlocProvider
    bloc={[UserBloc, CounterCubit]}
    name="user-multi-bloc-provider"
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))}
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer />
    </Suspense>
  </BlocProvider>
)
