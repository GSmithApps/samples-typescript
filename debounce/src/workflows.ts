import type * as activities from './activities';
import { condition, defineSignal, proxyActivities, log, setHandler, workflowInfo, continueAsNew, sleep } from '@temporalio/workflow';

export const signalDef = defineSignal<[string]>('mySignal');

const { myActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function debounce(signals: string[] = []): Promise<string> {

  setHandler(signalDef, (val: string) => {
    signals.push(val);
    log.info(`Received signal: ${val}. The array is of length ${signals.length}`);
  });

  while (true) {

    let previousSignalsLength = 0;

    await condition(() => signals.length > 0);

    // debouncing
    while (true) {
      await condition(() => signals.length > previousSignalsLength, 5000);
      if (signals.length > previousSignalsLength) {
        previousSignalsLength = signals.length;
      } else {
        break;
      }
    }

    const lastItem = signals[previousSignalsLength - 1];

    signals.splice(0, previousSignalsLength);

    log.info(`Running activity with input: ${lastItem}`);
    const output = await myActivity(lastItem);
    log.info(`Activity finished with input: ${lastItem}, output: ${output}`);

    // since this is a long-running workflow with potential for many signals
    // we'll want to make sure we're within Temporal limits by respecting continueAsNewSuggested
    // this is not inside the debounce loop because the expectation is that bursts resolve relatively quickly
    if (workflowInfo().continueAsNewSuggested) {
      log.info(`The Workflow is continuing as new. Its array is of length: ${signals.length}.`);
      await continueAsNew<typeof debounce>(signals);
    }
  }
}
