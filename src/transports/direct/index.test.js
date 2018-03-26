import DirectTransport from './';

describe('Direct Transport', () => {
  it('is a defined export', () => {
    expect(DirectTransport).toBeInstanceOf(Function);
  });

  describe('Constructor', () => {
    it('should throw prefixed error if config is not valid', () => {

    });

    it('should validate config and return it', () => {

    });

    it('should initialize transport instance', () => {

    });
  });

  describe('Call', () => {
    it('should throw if passed entity name is different than initial one', () => {

    });

    it('should throw if handler is not yet initialized', () => {

    });

    it('should call handler and return the result', () => {

    });
  });

  describe('Init', () => {
    it('should return the instance', () => {

    });
  });

  describe('Listen', () => {
    it('should throw if handler is already assigned', () => {

    });

    it('should throw if passed handler is not a function', () => {

    });

    it('should add handler to the command map', () => {
      
    });
  });
});
