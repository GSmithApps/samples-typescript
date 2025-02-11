import { NativeConnection, Worker, WorkerOptions } from '@temporalio/worker';
// in a stateless activity, you would do something like this
//import * as activities from './activities';
// in a stateful activity, you would do something like this
import { GreetingActivities } from './activities';

async function run() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });
  try {
    const greeter = new GreetingActivities();

    const x: WorkerOptions = {
      connection,
      namespace: 'default',
      taskQueue: 'hello-world',
      workflowsPath: require.resolve('./workflows'),
      // in a stateless activity, you would do something like this
      // activities
      // which is the same as
      // activities: activities
      // in a stateful activity, you would do something like this
      activities: { greet: greeter.greet.bind(greeter) },
      // your first attempt may be what's written below, but that won't work because
      // you need to bind the method to the instance for `this` to work, as shown above.
      // activities: {greet: greeter.greet},
    };

    const worker = await Worker.create(x);

    await worker.run();
  } finally {
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
