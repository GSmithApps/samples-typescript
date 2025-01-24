# Infrequently Polling Activity

This sample shows how to use Activity retries for infrequent polling of a third-party service (for example via REST). This method can be used for infrequent polls of one minute or slower.

Activity retries are utilized for this option, setting the following Retry options:

- `BackoffCoefficient`: to 1
- `InitialInterval`: to the polling interval (in this sample set to 60 seconds)

This will enable the Activity to be retried exactly on the set interval.

To run, first see [README.md](../../../README.md) for prerequisites. Then, run the following from this directory
in a separate terminal to start the worker:

    dotnet run worker

Then in another terminal, run the workflow from this directory:

    dotnet run workflow

This will show logs in the worker window of the workflow running.


### Running this sample

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.

The Workflow should return:

```txt
Hello, Temporal!
```
