// @@@SNIPSTART typescript-hello-workflow
import { proxyActivities, ActivityOptions, RetryPolicy } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const retryPolicy: RetryPolicy = {
  backoffCoefficient: 1,
  initialInterval: 60 * 1000,
}

const activityOptions: ActivityOptions = {
  retry: retryPolicy,
  startToCloseTimeout: 2 * 1000,
}

const { greet } = proxyActivities<typeof activities>(activityOptions);

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
// @@@SNIPEND
