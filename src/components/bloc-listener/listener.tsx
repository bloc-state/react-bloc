import { BlocBase } from "@bloc-state/bloc"
import { useLayoutSubscription, useObservable } from "observable-hooks"
import { filter, map, pairwise } from "rxjs"
import { getBlocContext } from "../../context"
import { useBlocInstance } from "../../hooks"
import {
  BlocListenerProps,
  BlocResolver,
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

export function subscribeToListener<B extends BlocBase<any>>({
  bloc,
  listener,
  listenWhen,
  scope,
}: BlocListenerProps<B>) {
  const blocInstance = useBlocInstance(bloc, scope)
  const blocListener = listener
  const when = listenWhen ?? (() => true)

  const state$ = useObservable(() =>
    blocInstance.state$.pipe(
      pairwise(),
      filter(([previous, current]) => {
        return when(previous, current)
      }),
      map(([_, current]) => current),
    ),
  )

  useLayoutSubscription( state$, ( next ) => {
      blocListener(get, next)
  },(error) => console.log("error called from useLayoutSub"))
}

export function BlocListener<B extends BlocBase<any>>(
  props: React.PropsWithChildren<BlocListenerProps<B>>,
) {
  subscribeToListener(props)

  return <> {props.children} </>
}
