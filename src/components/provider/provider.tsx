import { useState, Fragment, createContext, useEffect } from "react"
import { BlocProviderProps, BlocProviderState } from "../../types"
import {
  addBlocContext,
  getBlocContext,
  hasBlocContext,
  removeBlocContext,
} from "../../context/context"
import { asClass } from "awilix"
import { resolver } from "../../context/resolver"
import { createChildContainer } from "../../container"

export function BlocProvider(
  props: React.PropsWithChildren<BlocProviderProps>,
) {
  const [state, setState] = useState<BlocProviderState | null>(null)

  useEffect(() => {
    const stateFromProps = getStateFromProps(props)

    setState(stateFromProps)

    if (props.onCreate) {
      props.onCreate(resolver)
    }

    return () => {
      removeBlocContext(stateFromProps.blocContext)
      if (stateFromProps.shouldDestroy) {
        stateFromProps.container.dispose()
      }
    }
  }, props.deps || [])

  if (state) {
    return (
      <state.blocContext.context.Provider value={state.container}>
        {props.children}
      </state.blocContext.context.Provider>
    )
  }

  return <Fragment></Fragment>
}

const getStateFromProps = ({
  container,
  bloc,
  scope,
}: BlocProviderProps): BlocProviderState => {
  const providerContainer = container ?? createChildContainer()
  const shouldDestroy = !container // only destroy if the container is created by the provider
  let names = bloc
    .map((blocClass) => {
      const name = scope ? `${scope}-${blocClass.name}` : blocClass.name
      if (hasBlocContext(name))
        throw new Error(
          `BlocProvider.getStateFromProps: ${name} already exists in current provider context`,
        )

      return name
    })
    .sort()
    .join("-")

  if (scope) {
    names = `${scope}-${names}`
  }

  let blocContext = getBlocContext(names)

  if (!blocContext) {
    blocContext = {
      context: createContext(providerContainer),
      container: providerContainer,
    }
    blocContext.context.displayName = names
    addBlocContext(names, blocContext)
  }

  for (let b of bloc) {
    const name = scope ? `${scope}-${b.name}` : b.name
    providerContainer.register({
      [name]: asClass(b)
        .disposer((_bloc) => _bloc.close())
        .scoped(),
    })

    addBlocContext(name, blocContext)
  }

  return { blocContext, container: providerContainer, shouldDestroy }
}
