import { useBlocSelector } from "../../../../src"
import CounterCubit from "../counter.cubit"

type CounterBlocConsumerProps = {
  suspendWhen?: (state: number) => boolean
}

export const CounterBlocConsumer = ( { suspendWhen } : CounterBlocConsumerProps) => {
  const count = useBlocSelector( CounterCubit, {
    selector: ( state ) => state,
    suspendWhen,
  })
  return <p data-testid="test-counter">{count}</p>
}