import { useState, Fragment, createContext, useLayoutEffect } from "react"
import {
  BlocModule,
  BlocProviderProps,
  BlocProviderState,
  BlocResolver,
} from "../../types"
import {
  addBlocContext,
  getBlocContext,
  hasBlocContext,
  removeBlocContext,
} from "../../context/context"
import { asClass, createContainer } from "awilix"

// Don't export the root container directly
const rootContainer = createContainer()

BlocProvider.getRegistrations = () => rootContainer.registrations

export const registerModules = (modules: BlocModule[]) => {
  modules.forEach((module) => module(rootContainer))
}

export function BlocProvider(
  props: React.PropsWithChildren<BlocProviderProps>,
) {
  const [state, setState] = useState<BlocProviderState | null>(null)

  useLayoutEffect(() => {
    const stateFromProps = getStateFromProps(props)

    setState(stateFromProps)

    if (props.onCreate) {
      const getter: BlocResolver = (blocClass, scope) => {
        const name = scope ? `${scope}-${blocClass.name}` : blocClass.name
        const context = getBlocContext(name)
        if (!context) {
          throw new Error(
            `BlocProvider: BlocProvider could not find context "${name}"`,
          )
        }
        return context.container.resolve(name)
      }

      props.onCreate(getter)
    }

    return () => {
      removeBlocContext(stateFromProps.blocContext)
      if (stateFromProps.shouldDestroy) {
        stateFromProps.container.dispose()
      }
    }
  }, [])

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
  const providerContainer = container ?? rootContainer.createScope()
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
