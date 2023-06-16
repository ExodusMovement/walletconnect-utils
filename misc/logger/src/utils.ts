import { PINO_CUSTOM_CONTEXT_KEY, PINO_LOGGER_DEFAULTS } from "./constants";

export type Logger = Console;
export type LoggerOptions = {};

export function getDefaultLoggerOptions(opts?: any): LoggerOptions {
  return {
  };
}

export function getLoggerContext(
  logger: Logger,
  customContextKey: string = PINO_CUSTOM_CONTEXT_KEY
): string {
  return "not implemented in Exodus fork";
}

export function generateChildLogger(
  logger: Logger,
  childContext: string,
  customContextKey: string = PINO_CUSTOM_CONTEXT_KEY
): Logger {
  return logger;
}
