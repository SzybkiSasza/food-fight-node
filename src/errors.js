class ExtendableError extends Error {
  constructor(message) {
    super(message);

    // Automatically use class name
    this.name = this.constructor.name;

    // Use stack trace, if possible
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

// Place any error classes here
export class TimeoutError extends ExtendableError {}
export class ServerError extends ExtendableError {}

