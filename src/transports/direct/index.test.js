import DirectTransport from './';

describe('Direct Transport', () => {
  it('is a defined export', () => {
    expect(DirectTransport).toBeInstanceOf(Function);
  });

  describe('Constructor', () => {
    it('should throw prefixed error if config is not valid', () => {
      const config = {};

      try {
        new DirectTransport(config);

        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toMatch(
          /\[FoodFight: Direct Transport\].*\["entityName" is required\]/);
      }
    });

    it('should validate config and return it', () => {
      const validConfig = {
        entityName: 'testEntity',
        timeout: 1000,
      };

      const transport = new DirectTransport(validConfig);
      expect(transport.config).toEqual(validConfig);
    });

    it('should initialize transport instance', () => {
      const config = {
        entityName: 'testEntity2',
        timeout: 100,
      };

      const transport = new DirectTransport(config);
      expect(transport).toBeInstanceOf(DirectTransport);
      expect(transport.commandMap).toBeInstanceOf(Map);
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
