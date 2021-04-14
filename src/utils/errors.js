class DevError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DevError';
  }
}

export { DevError };
