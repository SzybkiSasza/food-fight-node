import DirectTransport from 'transports/direct/index';

describe('Direct Transport', () => {
  it('is a defined export', () => {
    expect(DirectTransport).toBeInstanceOf(Function);
  });

  it('should return transport name', () => {
    const direct = new DirectTransport({
      entityName: 'testName',
    });

    expect(direct.name).toEqual('direct');
  });

  describe('Constructor', () => {
    it('should throw prefixed error if config is not valid', () => {
      const config = {};

      try {
        new DirectTransport(config);

        throw new Error('This is not reached');
      } catch (err) {
        expect(err.message).toMatch(/\[FoodFight: Direct Transport\].*\["entityName" is required\]/);
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
    it('should throw if passed entity name is different than registered one', async () => {
      const config = {
        entityName: 'testEntity',
      };

      const direct = new DirectTransport(config);

      try {
        await direct.call('anotherEntity', 'someCommandName', {});
        throw new Error('Not reached!');
      } catch (err) {
        expect(err.message).toEqual('[FoodFight: Direct Transport] Trying to call handler with wrong instance name: anotherEntity');
      }
    });

    it('should throw if handler is not yet initialized', async () => {
      const config = {
        entityName: 'entityName',
      };

      const direct = new DirectTransport(config);

      try {
        await direct.call('entityName', 'someCommandName', {});
        throw new Error('Not reached!');
      } catch (err) {
        expect(err.message).toEqual('[FoodFight: Direct Transport] Handler was not yet added to transport: someCommandName');
      }
    });

    it('should call handler and return the result', async () => {
      const config = {
        entityName: 'testEntity',
      };
      const bodyData = {
        body: 'data',
      };

      const direct = new DirectTransport(config);
      const handler = jest.fn(() => Promise.resolve('testString'));

      await direct.listen('testEndpoint', handler);
      const result = await direct.call('testEntity', 'testEndpoint', bodyData);

      expect(result).toEqual('testString');
      expect(handler).toHaveBeenCalledWith(bodyData);
    });

    it('should throw specific error on timeout', async () => {
      // I didn't find a way to mock timers to be used with Promises.
      // Hence, I set very small timeout.
      const config = {
        entityName: 'timeoutEntity',
        timeout: 1,
      };
      const bodyData = {
        my: 'data',
      };

      const direct = new DirectTransport(config);
      const handler = jest.fn(() => new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 10);
      }));

      await direct.listen('testEndpoint', handler);

      try {
        await direct.call('timeoutEntity', 'testEndpoint', bodyData);

        throw new Error('This should not be reached');
      } catch (err) {
        expect(err.message).toEqual('[FoodFight: Direct Transport] testEndpoint call timed out');
      }
    });
  });

  describe('Init', () => {
    it('should return the same instance', async () => {
      const config = {
        entityName: 'initializedInstanceTest',
      };

      const direct = new DirectTransport(config);
      const initialized = await direct.init();

      expect(initialized).toEqual(direct);
    });
  });

  describe('Listen', () => {
    it('should throw if handler is already assigned', async () => {
      const config = {
        entityName: 'handlerListen',
      };
      const handler = jest.fn();

      const direct = new DirectTransport(config);
      await direct.listen('testCommand', handler);

      try {
        await direct.listen('testCommand', handler);

        throw new Error('This should not be reached');
      } catch (err) {
        expect(err.message)
          .toEqual('[FoodFight: Direct Transport] Trying to add new handler to existing command: testCommand');
      }
    });

    it('should throw if passed handler is not a function', async () => {
      const config = {
        entityName: 'handlerErrorTest',
      };

      const direct = new DirectTransport(config);

      try {
        await direct.listen('testCommand', {});

        throw new Error('This should not be reached');
      } catch (err) {
        expect(err.message)
          .toEqual('[FoodFight: Direct Transport] Handler must be a function!');
      }
    });

    it('should add handler to the command map', async () => {
      const config = {
        entityName: 'listenTest',
      };

      const direct = new DirectTransport(config);
      const handler = jest.fn();

      await direct.listen('testCommand', handler);

      const map = direct.commandMap;
      expect(map.size).toEqual(1);
      expect(map.get('listenTest_testCommand')).toEqual(handler);
    });
  });
});
