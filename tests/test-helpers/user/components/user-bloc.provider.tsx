import { Suspense } from "react"
import { DependencyContainer } from "tsyringe"
import { UserBloc, UserLastNameAsyncChangedEvent } from ".."
import { BlocProvider } from "../../../../src"
import CounterCubit from "../../counter/counter.cubit"
import { UserBlocConsumer } from "./user-bloc-consumer"

export const UserBlocProvider = (
  container?: DependencyContainer,
  swr?: boolean,
) => (
  <BlocProvider
    bloc={UserBloc}
    container={container}
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent())}
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
    onCreate={(get) => get(UserBloc).add(new UserLastNameAsyncChangedEvent())}
  >
    <Suspense fallback={<div data-testid="test-loading">loading</div>}>
      <UserBlocConsumer />
    </Suspense>
  </BlocProvider>
)
