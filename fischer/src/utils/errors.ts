export type InitializationErrorReason =
  | 'username-taken'
  | 'connection-id-taken';
export class InitializationError extends Error {
  constructor(message: InitializationErrorReason) {
    super(message);
    this.name = 'InitializationError';
  }
}
