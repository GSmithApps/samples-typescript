
import { Logger } from '@temporalio/common';
import { LogMetadata } from '@temporalio/worker';

/**
 * Wrapper for the logger to allow an additional object or error to be passed to the logger.
 * 
 * @example
 * ```ts
 * import { log } from '@temporalio/activity';
 * 
 * logger = LogWrapper(log);
 * logger.info('Log from activity', { prop: 'value' });
 * ```
 */
export class LogWrapper {

    private _logger: Logger;

    /**
     * Create the logger by injecting a Activity logger.
     *
     * @param log the logger to be injected
     */
    constructor(private logger: Logger) {
        this._logger = logger;
    }

    info(message: string, extraObject?: object, meta?: LogMetadata): void {
        this._logger.info(
            message,
            extraObject
                ? meta
                    ? { ...meta, fromsplat: "from-splat", extraObject: extraObject }
                    : { notfromsplat: "not-from-splat", extraObject: extraObject}
                : meta
        );
    }

}