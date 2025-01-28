import { log } from '@temporalio/activity';
import { LogWrapper } from '../logWrapper';

const logger = new LogWrapper(log);

// @@@SNIPSTART typescript-activity-use-injected-logger
export async function greet(name: string): Promise<string> {
  const errorFromCode = { errorInfo: 'This-is-the-error-info' };
  logger.info('Log from activity', errorFromCode,);
  return `Hello, ${name}!`;
}
// @@@SNIPEND
