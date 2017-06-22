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
    configSchema.validate.mockImplementationOnce(() => ({
      value: {
        some: 'config',
      },
    }));

    const instance = new Instance({
      entityName: 'EN',
    });

    expect(instance.isInitialized).toEqual(false);
    expect(instance.config).toEqual({
      some: 'config',
    });
  });
});
