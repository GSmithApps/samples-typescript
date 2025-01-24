// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { debounce } from './workflows';
import { workflowId } from './constants';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(debounce, {
    taskQueue: 'hello-world',
    // type inference works! args: [name: string]
    args: [[]],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId,
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
