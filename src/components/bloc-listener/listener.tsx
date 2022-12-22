import { BlocBase } from "@bloc-state/bloc"
import { useLayoutSubscription, useObservable } from "observable-hooks"
import { filter, map, pairwise } from "rxjs"
import { useBlocInstance } from "../../hooks"
import { BlocListenerProps } from "../../types"
import { resolver } from "../../context/resolver"

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

  useLayoutSubscription(state$, (next) => {
    blocListener(resolver, next)
  })
}

export function BlocListener<B extends BlocBase<any>>(
  props: React.PropsWithChildren<BlocListenerProps<B>>,
) {
  subscribeToListener(props)

  return <> {props.children} </>
}
