import { createContext } from "react"
import { Lifecycle, container as rootContainer } from "tsyringe"
import {
  BlocProviderProps,
  MultiBlocProviderProps,
  BlocProviderState,
  SingleBlocProviderProps,
} from "../../types"
import { getBlocContext, addBlocContext } from "../../context/context"

export const isMultiBlocProvider = (
  props: BlocProviderProps,
): props is MultiBlocProviderProps => Array.isArray(props.bloc)

export const getStateFromMultiBlocProviderProps = ({
  container,
  bloc,
}: MultiBlocProviderProps): BlocProviderState => {
  const providerContainer = container ?? rootContainer.createChildContainer()
  const shouldDestroy = !container // only destroy if the container is created by the provider
  const names = bloc
    .map((blocClass) => blocClass.name)
    .sort()
    .join("-")

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
    const context = getBlocContext(b.name)
    if (context) {
      throw new Error(
        `BlocProvider: ${b.name} already exists in a current provider context`,
      )
    }
    providerContainer.register(
      b,
      { useClass: b },
      {
        lifecycle: Lifecycle.ContainerScoped,
      },
    )
    addBlocContext(b.name, blocContext)
  }

  return { blocContext, container: providerContainer, shouldDestroy }
}

export const getStateFromSingleBlocProviderProps = function ({
  bloc,
  container,
}: SingleBlocProviderProps): BlocProviderState {
  const providerContainer = container ?? rootContainer.createChildContainer()
  const shouldDestroy = !container // only destroy if the container is created by the provider
  const name = bloc.name

  let blocContext = getBlocContext(name)

  if (!blocContext) {
    blocContext = {
      context: createContext(providerContainer),
      container: providerContainer,
    }
    blocContext.context.displayName = name
    providerContainer.register(
      bloc,
      { useClass: bloc },
      {
        lifecycle: Lifecycle.ContainerScoped,
      },
    )
    addBlocContext(name, blocContext)
  }

  return { blocContext, container: providerContainer, shouldDestroy }
}

export const getStateFromProps = function (
  props: BlocProviderProps,
): BlocProviderState {
  return isMultiBlocProvider(props)
    ? getStateFromMultiBlocProviderProps(props)
    : getStateFromSingleBlocProviderProps(props)
}
