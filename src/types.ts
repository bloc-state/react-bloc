import { BlocBase, Bloc, Cubit, ClassType } from "@bloc-state/bloc"
import { State } from "@bloc-state/state"
import { AwilixContainer, NameAndRegistrationPair } from "awilix"
import { BlocContext } from "./context/context"

export type StateType<T extends BlocBase<any>> = T extends Cubit<infer U>
  ? U
  : T extends Bloc<any, infer D>
  ? D
  : never

export type DataType<T> = T extends State<infer U> ? U : T

export type SelectorStateType<B extends BlocBase<any>> = DataType<StateType<B>>

export type BlocModule = (container: AwilixContainer) => void

export type UseBlocConfig = {
  scope?: string
}

export type UseBlocSelectorConfig<B extends BlocBase<any>, P> = {
  selector: (state: SelectorStateType<B>) => P
  listenWhen?: (state: StateType<B>) => boolean
  suspendWhen?: (state: StateType<B>) => boolean
  errorWhen?: (state: StateType<B>) => boolean
} & UseBlocConfig

export type OnCreate = (
  get: <B extends BlocBase<any>>(blocClass: ClassType<B>, scope?: string) => B,
) => void

export type BlocClass = ClassType<BlocBase>

export type BlocRegistration = {
  bloc: ClassType<BlocBase>
  registration: NameAndRegistrationPair<any>
}

export type Registration = BlocClass | BlocRegistration

export type BlocProviderProps = {
  bloc: [Registration, ...Registration[]]
  deps?: React.DependencyList
  scope?: string
  onCreate?: OnCreate
  container?: AwilixContainer
}

export type BlocProviderState = {
  blocContext: BlocContext
  container: AwilixContainer
  shouldDestroy: boolean
}

export type BlocResolver = <B extends BlocBase<any>>(
  blocClass: ClassType<B>,
  scope?: string,
) => B

export interface BlocListenerProps<B extends BlocBase<any>> {
  bloc: ClassType<B>
  scope?: string
  listener: (
    resolver: BlocResolver,
    state: StateType<InstanceType<this["bloc"]>>,
  ) => void
  listenWhen?: (
    previous: StateType<InstanceType<this["bloc"]>>,
    current: StateType<InstanceType<this["bloc"]>>,
  ) => boolean
}
