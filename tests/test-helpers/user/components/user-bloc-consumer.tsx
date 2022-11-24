import { UserBloc } from ".."
import { useBlocSelector } from "../../../../src"

type UserBlocConsumerProps = {
  swr?: boolean,
  suspend?: boolean
}

export const UserBlocConsumer = ({ swr, suspend }: UserBlocConsumerProps) => {
  const lastName = useBlocSelector(UserBloc, {
    selector: (state) => state.name.last,
    swr,
    suspend
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{lastName}</p>
    </>
  )
}
