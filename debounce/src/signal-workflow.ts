import { Client } from '@temporalio/client';
import { signalDef } from './workflows';
import { workflowId } from './constants';

async function run(): Promise<void> {
  const client = new Client();

  const handle = client.workflow.getHandle(workflowId);

  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr.push(handle.signal(signalDef, "signal" + i));
    console.log(`sent signal${i}`);
  }

  await Promise.all(arr)
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
