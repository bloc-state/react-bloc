import { BlocBase, Bloc, Cubit, ClassType } from "@bloc-state/bloc"
import { State } from "@bloc-state/state"
import { AwilixContainer } from "awilix"
import { Observable } from "rxjs"
import { BlocContext } from "./context/context"

export type StateType<T extends BlocBase<any>> = T extends Cubit<infer U>
  ? U
  : T extends Bloc<any, infer D>
  ? D
  : never

export type SuspenseDataType<T> = T extends State<infer U> ? U : T

export type SelectorStateType<B extends BlocBase<any>> = SuspenseDataType<
  StateType<B>
>

export type BlocModule = (container: AwilixContainer) => void

export type UseBlocConfig = {
  scope?: string
}

export type UseBlocSelectorConfig<B extends BlocBase<any>, P> = {
  selector: (state: SelectorStateType<B>) => P
  scope?: string
  listenWhen?: (state: StateType<B>) => boolean
  suspendWhen?: (state: StateType<B>) => boolean
  errorWhen?: (state: StateType<B>) => boolean
}

export type BlocType<T extends BlocBase<any>> = T extends Bloc<infer E, infer S>
  ? Bloc<E, S>
  : T extends Cubit<infer S>
  ? Cubit<S>
  : never

export type StreamType<T extends Observable<any>> = T extends Observable<
  infer U
>
  ? U
  : never

export type ProvidedBlocType = BlocBase<any> | BlocBase<any>[]

export type OnCreate = (
  get: <B extends BlocBase<any>>(blocClass: ClassType<B>, scope?: string) => B,
) => void

export type BlocProviderProps = {
  bloc: [ClassType<BlocBase>, ...ClassType<BlocBase>[]]
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
