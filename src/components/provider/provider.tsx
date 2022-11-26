import { useState, useEffect, Fragment } from "react"
import { BlocProviderProps, BlocProviderState, BlocResolver } from "../../types"
import { getBlocContext, removeBlocContext } from "../../context/context"
import { getStateFromProps } from "./util"

export function BlocProvider(
  props: React.PropsWithChildren<BlocProviderProps>,
) {
  const [state, setState] = useState<BlocProviderState | null>(null)

  useEffect(() => {
    const stateFromProps = getStateFromProps(props)

    setState(stateFromProps)

    if (props.onCreate) {
      const getter: BlocResolver = (blocClass) => {
        const context = getBlocContext(blocClass.name)
        if ( !context ) {
          throw new Error(
            `BlocProvider: BlocProvider could not find context "${blocClass.name}"`,
          )
        }
        return context.container.resolve(blocClass)
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
