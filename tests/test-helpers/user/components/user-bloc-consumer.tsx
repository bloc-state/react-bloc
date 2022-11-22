import { UserBloc } from ".."
import { useBlocSelector } from "../../../../src"

type UserBlocConsumerProps = {
  swr?: boolean
}

export const UserBlocConsumer = ({ swr }: UserBlocConsumerProps) => {
  const lastName = useBlocSelector(UserBloc, {
    selector: (state) => state.name.last,
    swr: swr,
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{lastName}</p>
    </>
  )
}
