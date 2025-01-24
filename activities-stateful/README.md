# Stateful Activity sample

This sample shows how to make and use stateful activity.

There are a few key changes compared to a normal, stateless activity.

- The Activity Definition is a class method rather than a plain function
  (and the state is within the class)
- In the Workflow Definition, instead of importing all the activities,
  you can just import the class. And when you proxy the activities,
  you'd just proxy the class.
- In the worker code, when passing in the activities, make sure to do the
  binding so the `this` call in the activity definition works.

### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.

The Workflow should try four times, throwing a `not yet` error each time,
and then on the fifth try, it should log `Hello Temporal!` to the
console and complete.
