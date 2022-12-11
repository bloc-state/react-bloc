import { UserBloc } from "../user"
import { useBlocSelector } from "../../../../src"

type UserBlocConsumerProps = {
  suspend?: boolean
}

export const UserBlocConsumer = ({ suspend }: UserBlocConsumerProps) => {
  const lastName = useBlocSelector(UserBloc, {
    selector: (state) => state.name.last,
    suspend,
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{lastName}</p>
    </>
  )
}
