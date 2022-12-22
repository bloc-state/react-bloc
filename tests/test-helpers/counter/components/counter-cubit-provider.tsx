import { AwilixContainer } from "awilix"
import { Suspense } from "react"
import { BlocProvider, useBlocInstance } from "../../../../src"
import { CounterBlocConsumer } from "./counter-cubit-consumer"
import CounterCubit from "../counter.cubit"
import { ErrorBoundary } from "react-error-boundary"
import { CounterErrorFallback } from "./counter-error-boundary"

export const CounterBlocProvider = (
  container?: AwilixContainer,
  suspendWhen?: (state: number) => boolean,
  errorWhen?: (state: number) => boolean,
) => (
  <BlocProvider bloc={[CounterCubit]} container={container}>
    <CounterBlocWrapper suspendWhen={suspendWhen} errorWhen={errorWhen} />
  </BlocProvider>
)

type CounterBlocWrapperProps = {
  suspendWhen?: (state: number) => boolean
  errorWhen?: (state: number) => boolean
}

const CounterBlocWrapper = ({
  suspendWhen,
  errorWhen,
}: CounterBlocWrapperProps) => {
  const { emit } = useBlocInstance(CounterCubit)

  return (
    <ErrorBoundary
      FallbackComponent={CounterErrorFallback}
      onReset={() => emit((state) => state + 1)}
    >
      <Suspense fallback={<div data-testid="test-loading">...loading</div>}>
        <CounterBlocConsumer suspendWhen={suspendWhen} errorWhen={errorWhen} />
      </Suspense>
    </ErrorBoundary>
  )
}
