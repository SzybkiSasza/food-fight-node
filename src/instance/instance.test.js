jest.mock('../transports');
jest.mock('./schemas/config');

import configSchema from './schemas/config';

import Instance from './instance';

describe('Instance class tests', () => {
  it('Is a defined class', () => {
    expect(Instance).toBeInstanceOf(Function);
  });

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

    expect(instance.transports.length).toEqual(0);
    expect(instance.config).toEqual(config);
  });

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

    try {
      const instance = new Instance(config);
      await instance.init();

      throw new Error('This should not be thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toEqual('Transport: invalid not supported!');
    }
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

    expect(instance.transports.length).toEqual(1);
  });
});
