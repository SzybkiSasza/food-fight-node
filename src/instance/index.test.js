jest.mock('./instance');

import Instance from './instance';
import * as index from './';

describe('Instance index', () => {
  it('Is a defined export', () => {
    expect(index).toEqual(expect.any(Object));
  });

  it('Exposes three functions', () => {
    expect(Object.keys(index)).toEqual(['init', 'listen', 'call']);
  });

  it('Throws an error if listen is used before instance initialization',
  async () => {
    try {
      await index.listen('cmdName', () => {}, ['direct']);
      throw new Error('This is not called');
    } catch (err) {
      expect(err.message).toEqual('Instance not initialized!');
    }
  });

  it('Throws an error if call is used before instance initialization',
  async () => {
    try {
      await index.call('someEntity', 'cmdName', 'direct', {some: 'value'});
      throw new Error('This is not called');
    } catch (err) {
      expect(err.message).toEqual('Instance not initialized!');
    }
  });

  it('Initializes the instance', () => {
    index.init({
      some: 'config',
      keys: 'here',
    });

    expect(Instance).toHaveBeenCalledTimes(1);
    expect(Instance.mock.instances[0].init).toHaveBeenCalledTimes(1);
  });

  it('Throws an error on second initialization', async () => {
    try {
      await index.init({
        config: 'value',
      });
      throw new Error('This is not called');
    } catch (err) {
      expect(err.message).toEqual('Instance already initialized!');
    }
  });

  it('Calls instance functions', async () => {
    const instanceInstance = Instance.mock.instances[0]; // Moon Moon!
    instanceInstance.call.mockClear();
    instanceInstance.listen.mockClear();

    await index.listen('cmdName', () => {}, ['direct']);
    await index.call('someEntity', 'cmdName', 'direct', {some: 'value'});

    expect(instanceInstance.listen).toHaveBeenCalledWith(
      'cmdName', expect.any(Function), ['direct']
    );
    expect(instanceInstance.call).toBeCalledWith(
      'someEntity', 'cmdName', 'direct', {some: 'value'});
  });
});
