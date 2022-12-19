import { AwilixContainer } from "awilix";
import { Suspense } from "react";
import { BlocProvider } from "../../../../src";
import { CounterBlocConsumer } from "./counter-cubit-consumer";
import CounterCubit from "../counter.cubit";

export const CounterBlocProvider = (container?: AwilixContainer, suspendWhen?: (state: any) => boolean) => (
  <BlocProvider
		bloc={ [ CounterCubit ] }
		container={ container }
  >
    <Suspense fallback={<div data-testid="test-loading">...loading</div>}>
      <CounterBlocConsumer suspendWhen={suspendWhen} />
    </Suspense>
  </BlocProvider>
)
