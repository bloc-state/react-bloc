import { BlocBase } from "@bloc-state/bloc"
import {
  useLayoutSubscription,
} from "observable-hooks"
import { filter, map, pairwise } from "rxjs"
import { getBlocContext } from "../../context"
import { useBlocInstance } from "../../hooks"
import {
  BlocListenerProps,
  BlocResolver,
  isMultiBlocListener,
  MultiBlocListenerProps,
} from "../../types"

export const get: BlocResolver = (blocClass, scope) => {
  const name = scope ? `${scope}-${blocClass.name}` : blocClass.name

  const blocContext = getBlocContext(name)

  if (!blocContext) {
    throw new Error(
      `BlocListener: bloc listener could not find context "${blocClass.name}"`,
    )
  }

  return blocContext.container.resolve(name)
}

export function subscribeToListener <B extends BlocBase<any>>(listener: BlocListenerProps<B>) {
  const bloc = useBlocInstance(listener.bloc, listener.scope)
  const blocListener = listener.listener ?? ( () => {})
  const listenWhen = listener.listenWhen ?? (() => true)
  const state$ = bloc.state$.pipe(
    pairwise(),
    filter( ( [ previous, current ] ) => {
      return listenWhen(previous, current)
    } ),
    map(([_, current]) => current)
  )

  useLayoutSubscription(state$, (next) => {
    blocListener(get, next)
  })
}

export function BlocListener<B extends BlocBase<any>>(
  props: React.PropsWithChildren<BlocListenerProps<B> | MultiBlocListenerProps<B>>,
) {

  if (isMultiBlocListener(props)) {
     props.listeners.forEach(subscribeToListener)
  } else {
    subscribeToListener(props)
  }

  return <>{props.children}</>
}
