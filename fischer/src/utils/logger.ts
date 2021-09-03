interface LoggerOptions {
  verbose: boolean;
}
export function createLogger(options?: LoggerOptions) {
  const { verbose = true } = options || {};

  if (verbose) return console.log;
  return Function.prototype;
}
