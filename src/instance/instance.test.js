jest.mock('../transports');
jest.mock('./schemas/config');

import * as transports from '../transports';

import configSchema from './schemas/config';
import Instance from './instance';

describe('Instance class tests', () => {
  it('Is a defined class', () => {
    expect(Instance).toBeInstanceOf(Function);
  });

  describe('Constructor', () => {
    it('Throw an error if config is not valid', () => {
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
        expect(err.message).toEqual('Some Validation Error!');
      }
    });

    it('Sets the config and initialization flag on the constructions', () => {
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
    it('Throws if transport for the config does not exist', async () => {
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
        expect(err.message).toEqual('Transport: invalid not supported!');

        expect(instance.isInitialized).toEqual(false);
      }
    });

    it('Initializes instance with new id', async () => {
       const config = {
          value: {
            transports: [],
          },
       };
       configSchema.validate.mockImplementationOnce(() => config);

       const instance = new Instance(config);
       await instance.init();

       expect(instance.id).toEqual(expect.any(String));
    });

    it('Asynchronously adds all the transports', async () => {
      transports.direct.prototype.init.mockImplementationOnce(async () => ({
        some: 'transportInstanceHere',
      }));

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
});
