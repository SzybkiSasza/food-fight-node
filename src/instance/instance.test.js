jest.mock('transports');
jest.mock('instance/schemas/config');

import transports from 'transports/index';

import configSchema from 'instance/schemas/config';
import Instance from 'instance/instance';

console.log(Instance);

describe('Instance class tests', () => {
  it('Is a defined class', () => {
    expect(Instance).toBeInstanceOf(Function);
  });

  describe('Constructor', () => {
    it('should throw an error if config is not valid', () => {
      configSchema.validate.mockImplementationOnce(() => ({
        error: new Error('Some Validation Error!'),
      }));

      try {
        new Instance({
          entityName: 'EN',
        });

        throw new Error('This should not be thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual('[FoodFight Instance] Some Validation Error!');
      }
    });

    it('should set the config and initialization flag on the constructions', () => {
      const config = {
        entityName: 'EN',
      };

      configSchema.validate.mockImplementationOnce(() => ({
        value: config,
      }));

      const instance = new Instance(config);

      expect(instance.isInitialized).toEqual(false);
      expect(instance.config).toEqual(config);
    });
  });

  describe('Init', () => {
    beforeEach(() => {
      transports.direct.prototype.init.mockReturnThis();
      transports.direct.prototype.name = 'direct'; // Mock getter
    });

    it('should throw an error if config does not contain any transports', async () => {
      const config = {
        value: {
          entityName: 'Nom',
          transports: [],
        },
      };
      configSchema.validate.mockImplementationOnce(() => config);

      let instance;
      try {
        instance = new Instance(config);
        await instance.init();

        throw new Error('This should not be thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual('[FoodFight Instance] No transports in the config, cannot initialize!');

        expect(instance.isInitialized).toEqual(false);
      }
    });

    it('should throw if transport is not supported', async () => {
      const config = {
        value: {
          entityName: 'Nom',
          transports: [{
            name: 'direct',
          }, {
            name: 'invalid',
          }],
        },
      };
      configSchema.validate.mockImplementationOnce(() => config);

      let instance;
      try {
        instance = new Instance(config);
        await instance.init();

        throw new Error('This should not be thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toEqual('[FoodFight Instance] Transport: invalid not supported!');

        expect(instance.isInitialized).toEqual(false);
      }
    });

    it('should merge main config with specific config', async () => {
      const instanceConfig = {
        value: {
          entityName: 'abc',
          timeout: 1000,
          transports: [{
            name: 'direct',
          }],
        },
      };
      configSchema.validate.mockImplementationOnce(() => instanceConfig);

      const instance = new Instance(instanceConfig);
      await instance.init();

      expect(instance.transports.direct.constructor).toHaveBeenCalledWith({
        entityName: 'abc',
        name: 'direct',
        timeout: 1000,
      });
    });

    it('should initialize the instance with new id', async () => {
      const config = {
        value: {
          transports: [{
            name: 'direct',
          }],
        },
      };
      configSchema.validate.mockImplementationOnce(() => config);

      const instance = new Instance(config);
      await instance.init();

      expect(instance.id).toEqual(expect.any(String));
    });

    it('Asynchronously adds all the transports', async () => {
      const config = {
        value: {
          entityName: 'Nom',
          transports: [{
            name: 'direct',
          }],
        },
      };
      configSchema.validate.mockImplementationOnce(() => config);

      const instance = new Instance(config);
      await instance.init();

      expect(instance.transports.direct).toBeInstanceOf(Object);
      expect(instance.isInitialized).toEqual(true);
    });
  });

  describe('Methods', () => {
    const oldConsoleWarn = console.warn;

    let instance;
    beforeEach(async () => {
      console.warn = jest.fn();

      transports.direct.prototype.init.mockReturnThis();

      const config = {
        value: {
          entityName: 'FooFi',
          transports: [{
            name: 'direct',
          }],
        },
      };
      configSchema.validate.mockImplementationOnce(() => config);

      instance = new Instance(config);
      await instance.init();
    });

    afterAll(() => {
      console.warn = oldConsoleWarn;
    });

    describe('Listen', () => {
      it('Throws an error if no transport is passed in array', async () => {
        try {
          await instance.listen('someCommandName', () => {});
          throw new Error('Not reached!');
        } catch (err) {
          expect(err.message).toEqual('[FoodFight Instance] At least one transport must be specified!');
        }
      });

      it('Logs an error if transport is not initialized', async () => {
        await instance.listen('someCommandName', () => {}, ['notExistingOne']);

        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn)
          .toHaveBeenCalledWith('[FoodFight Instance] Skipping transport notExistingOne, not initialized...');
      });

      it('Adds transport, if passed properly', async () => {
        await instance.listen('someCommandName', () => {}, ['direct']);

        expect(transports.direct.prototype.listen).toHaveBeenCalledTimes(1);
      });
    });

    describe('Call', () => {
      it('Should throw if transport is not initialized', async () => {
        try {
          await instance.call('someEntity', 'someCommand', 'notExistingOne', {});
          throw new Error('Not reached!');
        } catch (err) {
          expect(err.message).toEqual('[FoodFight Instance] Transport notExistingOne not initialized yet!');
        }
      });

      it('Calls transport instance and delegates the call', async () => {
        await instance.call('someEntity', 'someCommand', 'direct', {
          a: 'b',
        });

        expect(transports.direct.prototype.call).toHaveBeenCalledWith('someEntity', 'someCommand', {
          a: 'b',
        });
      });
    });
  });
});
