import { UserBloc } from "../user"
import { useBlocSelector, useBlocValue } from "../../../../src"
import CounterCubit from "../../counter/counter.cubit"

type UserBlocConsumerProps = {
  suspend?: boolean
}

export const UserBlocConsumer = ({ suspend }: UserBlocConsumerProps) => {
  const last = useBlocSelector( UserBloc, {
    selector: (user) => user.name.last
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{last}</p>
    </>
  )
}

export const CounterBlocConsumer = () => {
  const count = useBlocValue(CounterCubit)
  return <p data-testid="test-counter">{count}</p>
}

