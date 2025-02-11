import { proxyActivities, ActivityOptions, RetryPolicy } from '@temporalio/workflow';
// in a stateless activity, you would do something like this
// import type * as activities from './activities';
// in a stateful activity, you would do something like this
import { GreetingActivities } from './activities';

const retryPolicy: RetryPolicy = {
  backoffCoefficient: 1,
  initialInterval: 5 * 1000,
};

const activityOptions: ActivityOptions = {
  retry: retryPolicy,
  startToCloseTimeout: 2 * 1000,
};

// in a stateless activity, you would do something like this
// const { greet } = proxyActivities<typeof activities>(activityOptions);
// in a stateful activity, you would do something like this
const greeter = new GreetingActivities();
const { greet } = proxyActivities<{ greet: typeof greeter.greet }>(activityOptions);

export async function example(name: string): Promise<string> {
  return await greet(name);
}
