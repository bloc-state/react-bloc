import { BlocBase, Bloc, Cubit, ClassType } from "@bloc-state/bloc"
import { State } from "@bloc-state/state"
import { Observable } from "rxjs"
import { DependencyContainer } from "tsyringe"
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

export type UseBlocSelectorConfig<B extends BlocBase<any>, P> = {
  selector: (state: SelectorStateType<B>) => P
  listenWhen?: (state: StateType<B>) => boolean
  suspend?: boolean
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
  get: <B extends BlocBase<any>>(blocClass: ClassType<B>) => B,
) => void

export type SingleBlocProviderProps = {
  bloc: ClassType<BlocBase>
  onCreate?: OnCreate
  container?: DependencyContainer
}

export type MultiBlocProviderProps = {
  bloc: [ClassType<BlocBase>, ...ClassType<BlocBase>[]]
  name: string // if bloc is an array of blocs, a name is required for a provider context
  onCreate?: OnCreate
  container?: DependencyContainer
}

export type BlocProviderProps = SingleBlocProviderProps | MultiBlocProviderProps

export type BlocProviderState = {
  blocContext: BlocContext
  container: DependencyContainer
  shouldDestroy: boolean
}

export type BlocResolver = <B extends BlocBase<any>>(
  blocClass: ClassType<B>,
) => B

export type BlocListenerProps<S = any> = {
  bloc: ClassType<BlocBase<S>> | [ClassType<BlocBase>, ...ClassType<BlocBase>[]]
  listenWhen?: (resolver: BlocResolver, state: S) => boolean
  listen: (resolver: BlocResolver, state: S) => void
}

export type MultiBlocListenerProps<S = any> = {
  bloc: [ClassType<BlocBase>, ...ClassType<BlocBase>[]]
  listenWhen?: (resolver: BlocResolver, state: S) => boolean
  listen: (resolver: BlocResolver, state: S) => void
}

export const isMultiBlocListener = (
  props: BlocListenerProps,
): props is MultiBlocListenerProps => Array.isArray(props.bloc)
