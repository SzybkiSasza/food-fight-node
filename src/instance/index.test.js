jest.mock('./instance');

import Instance from './instance';
import * as index from './';

/**
 * Please note that this file tests singleton properties
 * Due to nature of this singleton, tests must be run in a specific order
 */
describe('Instance index', () => {
  const consoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('Is a defined export', () => {
    expect(index).toEqual(expect.any(Object));
  });

  it('should expose three functions', () => {
    expect(Object.keys(index)).toEqual(['init', 'listen', 'call']);
  });

  it('should throw an error if listen is used before instance initialization', async () => {
    try {
      await index.listen('cmdName', () => {}, ['direct']);
      throw new Error('This is not called');
    } catch (err) {
      expect(err.message).toEqual('Food Fight instance is not initialized!');
    }
  });

  it('should throw an error if call is used before instance initialization', async () => {
    try {
      await index.call('someEntity', 'cmdName', 'direct', { some: 'value' });
      throw new Error('This is not called');
    } catch (err) {
      expect(err.message).toEqual('Food Fight instance is not initialized!');
    }
  });

  describe('Initialization', async () => {
    beforeEach(() => {
      Instance.prototype.init.mockClear();
    });

    it('should catch init error from the instance', async () => {
      Instance.prototype.init.mockImplementationOnce(() => Promise.reject(new Error('Init error!')));

      try {
        await index.init();
        throw new Error('This is not called');
      } catch (err) {
        expect(err.message).toEqual('Init error!');
        expect(console.error).toHaveBeenCalledWith('Instance initialization failed! Check your config');
      }
    });

    it('should initialize the instance', async () => {
      Instance.mockClear();

      await index.init({
        some: 'config',
        keys: 'here',
      });

      expect(Instance).toHaveBeenCalledTimes(1);
      expect(Instance.mock.instances[0].init).toHaveBeenCalledTimes(1);
    });

    it('should throw an error on second initialization', async () => {
      try {
        await index.init({
          config: 'value',
        });
        throw new Error('This is not called');
      } catch (err) {
        expect(err.message).toEqual('Food Fight instance is already initialized!');
      }
    });
  });

  it('should call instance functions', async () => {
    const instanceInstance = Instance.mock.instances[0]; // Moon Moon!
    instanceInstance.call.mockClear();
    instanceInstance.listen.mockClear();

    await index.listen('cmdName', () => {}, ['direct']);
    await index.call('someEntity', 'cmdName', 'direct', { some: 'value' });

    expect(instanceInstance.listen).toHaveBeenCalledWith('cmdName', expect.any(Function), ['direct']);
    expect(instanceInstance.call).toBeCalledWith('someEntity', 'cmdName', 'direct', { some: 'value' });
  });
});
