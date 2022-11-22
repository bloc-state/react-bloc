import { useBlocValue } from "../../../../src"
import { CounterBloc } from "../counter.bloc"

export const CounterBlocConsumer = () => {
  const { status, error, data } = useBlocValue(CounterBloc)

  if (status === "initial") return <p>initial</p>
  if (status === "loading") return <p>loading</p>
  if (status === "ready") return <p>{data}</p>
  if (error) return <p>{error.message}</p>

  return <p>invalid state</p>
}
