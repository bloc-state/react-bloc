import { UserBloc } from "../user"
import { useBlocSelector } from "../../../../src"

type UserBlocConsumerProps = {
  suspendWhen?: (state: any) => boolean
}

export const UserBlocConsumer = ({ suspendWhen }: UserBlocConsumerProps) => {
  const last = useBlocSelector(UserBloc, {
    selector: (user) => user.name.last,
    suspendWhen,
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{last}</p>
    </>
  )
}

export const UserBlocConsumerWithScope = () => {
  const last = useBlocSelector(UserBloc, {
    scope: "test",
    selector: (user) => user.name.last,
  })

  return (
    <>
      <p data-testid="test-loaded">loaded</p>
      <p data-testid="test-name">{last}</p>
    </>
  )
}
