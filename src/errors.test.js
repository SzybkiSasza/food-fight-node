import * as Errors from 'errors';

describe('Extendable errors', () => {
  it('should expose two error classes', () => {
    expect(Errors.ServerError).toBeDefined();
    expect(Errors.TimeoutError).toBeDefined();
  });

  it('should create an instance of extendable error', () => {
    const timeoutError = new Errors.TimeoutError('testPhrase');

    expect(timeoutError.name).toEqual('TimeoutError');
    expect(timeoutError.message).toEqual('testPhrase');
    expect(timeoutError.stack).toBeDefined();
  });

  it('should fallback to original Error stack, if captureStackTrace is not available', () => {
    const oldCTS = Error.captureStackTrace;
    Error.captureStackTrace = undefined;

    try {
      const timeoutError = new Errors.TimeoutError('testPhrase');
      expect(timeoutError.stack).toBeDefined();
    } finally {
      // To prevent changing default error behaviour
      Error.captureStackTrace = oldCTS;
    }
  });
});
