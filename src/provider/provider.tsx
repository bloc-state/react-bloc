import { BlocBase, ClassType } from "@bloc-state/bloc"
import { useState, useEffect, Fragment } from "react"
import { BlocProviderProps, BlocProviderState } from "../types"
import { removeBlocContext } from "./context"
import { getStateFromProps } from "./util"

export function BlocProvider(
  props: React.PropsWithChildren<BlocProviderProps>,
) {
  const [state, setState] = useState<BlocProviderState | null>(null)

  useEffect(() => {
    const stateFromProps = getStateFromProps(props)

    setState(stateFromProps)

    if (props.onCreate) {
      const getter = <B extends BlocBase<any>>(blocClass: ClassType<B>) => {
        return stateFromProps.container.resolve(blocClass)
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
      <state.blocContext.Provider value={state.container}>
        {props.children}
      </state.blocContext.Provider>
    )
  }

  return <Fragment></Fragment>
}
