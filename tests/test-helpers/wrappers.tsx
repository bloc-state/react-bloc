import { BlocProvider } from "../../src"
import { CounterBloc } from "./counter/counter.bloc"
import CounterCubit from "./counter/counter.cubit"
import { UserBloc, UserLastNameAsyncChangedEvent } from "./user/user"

export const cubitCounterWrapper = ({ children }: any) => (
  <BlocProvider bloc={[CounterCubit]}>{children}</BlocProvider>
)

export const cubitCounterWithInitialCubitWrapper = ({
  children,
  bloc,
}: any) => <BlocProvider bloc={[bloc]}>{children}</BlocProvider>

export const blocCounterWrapper = ({ children }: any) => (
  <BlocProvider bloc={[CounterBloc]}>{children}</BlocProvider>
)

export const blocUserWrapper = ({ children }: any) => (
  <BlocProvider bloc={[UserBloc]}>{children}</BlocProvider>
)

export const blocSuspendableUserWrapper = ({ children }: any) => (
  <BlocProvider
    bloc={[UserBloc]}
    onCreate={(get) => {
      get(UserBloc).add(new UserLastNameAsyncChangedEvent("richards"))
    }}
  >
    {children}
  </BlocProvider>
)
