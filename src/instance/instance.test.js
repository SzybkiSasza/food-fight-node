jest.mock('../transports');
jest.mock('./schemas/config');

// import * as transports from '../transports';

// import configSchema from './schemas/config';
import Instance from './instance';

describe('Instance class tests', () => {
  it('Is a defined class', () => {
    expect(Instance).toBeInstanceOf(Function);
  });

  // describe('Constructor', () => {
  //   it('Throw an error if config is not valid', () => {
  //     configSchema.validate.mockImplementationOnce(() => ({
  //       error: new Error('Some Validation Error!'),
  //     }));
  //
  //     try {
  //       new Instance({
  //         entityName: 'EN',
  //       });
  //
  //       throw new Error('This should not be thrown');
  //     } catch (err) {
  //       expect(err).toBeInstanceOf(Error);
  //       expect(err.message).toEqual('Some Validation Error!');
  //     }
  //   });
  //
  //   it('Sets the config and initialization flag on the constructions', () => {
  //     const config = {
  //       entityName: 'EN',
  //     };
  //
  //     configSchema.validate.mockImplementationOnce(() => ({
  //       value: config,
  //     }));
  //
  //     const instance = new Instance(config);
  //
  //     expect(instance.isInitialized).toEqual(false);
  //     expect(instance.config).toEqual(config);
  //   });
  // });
  //
  // describe('Init', () => {
  //   it('Throws if transport for the config does not exist', async () => {
  //     const config = {
  //       value: {
  //         entityName: 'Nom',
  //         transports: [{
  //           name: 'direct',
  //         }, {
  //           name: 'invalid',
  //         }],
  //       },
  //     };
  //     configSchema.validate.mockImplementationOnce(() => config);
  //
  //     let instance;
  //     try {
  //       instance = new Instance(config);
  //       await instance.init();
  //
  //       throw new Error('This should not be thrown');
  //     } catch (err) {
  //       expect(err).toBeInstanceOf(Error);
  //       expect(err.message).toEqual('Transport: invalid not supported!');
  //
  //       expect(instance.isInitialized).toEqual(false);
  //     }
  //   });
  //
  //   it('Initializes instance with new id', async () => {
  //     const config = {
  //       value: {
  //         transports: [],
  //       },
  //     };
  //     configSchema.validate.mockImplementationOnce(() => config);
  //
  //     const instance = new Instance(config);
  //     await instance.init();
  //
  //     expect(instance.id).toEqual(expect.any(String));
  //   });
  //
  //   it('Asynchronously adds all the transports', async () => {
  //     transports.direct.prototype.init.mockImplementationOnce(async () => ({
  //       some: 'transportInstanceHere',
  //     }));
  //
  //     const config = {
  //       value: {
  //         entityName: 'Nom',
  //         transports: [{
  //           name: 'direct',
  //         }],
  //       },
  //     };
  //     configSchema.validate.mockImplementationOnce(() => config);
  //
  //     const instance = new Instance(config);
  //     await instance.init();
  //
  //     expect(instance.transports.direct).toBeInstanceOf(Object);
  //     expect(instance.isInitialized).toEqual(true);
  //   });
  // });
  //
  // describe('Methods', () => {
  //   const oldConsoleWarn = console.warn;
  //
  //   let instance;
  //   const transportMocks = {
  //     listen: jest.fn(),
  //     call: jest.fn(),
  //   };
  //
  //   beforeEach(async () => {
  //     console.warn = jest.fn();
  //
  //     transports.direct.prototype.init.mockImplementationOnce(async () => transportMocks);
  //     transportMocks.listen.mockClear();
  //     transportMocks.call.mockClear();
  //
  //     const config = {
  //       value: {
  //         entityName: 'FooFi',
  //         transports: [{
  //           name: 'direct',
  //         }],
  //       },
  //     };
  //     configSchema.validate.mockImplementationOnce(() => config);
  //
  //     instance = new Instance(config);
  //     await instance.init();
  //   });
  //
  //   afterAll(() => {
  //     console.warn = oldConsoleWarn;
  //   });
  //
  //   describe('Listen', () => {
  //     it('Throws an error if no transport is passed in array', async () => {
  //       try {
  //         await instance.listen('someCommandName', () => {});
  //         throw new Error('Not reached!');
  //       } catch (err) {
  //         expect(err.message).toEqual('At least one transport must be specified!');
  //       }
  //     });
  //
  //     it('Logs an error if transport is not initialized', async () => {
  //       await instance.listen('someCommandName', () => {}, ['notExistingOne']);
  //
  //       expect(console.warn).toHaveBeenCalledTimes(1);
  //       expect(console.warn).toHaveBeenCalledWith('Skipping transport notExistingOne, not initialized...');
  //     });
  //
  //     it('Adds transport, if passed properly', async () => {
  //       await instance.listen('someCommandName', () => {}, ['direct']);
  //
  //       expect(transportMocks.listen).toHaveBeenCalledTimes(1);
  //     });
  //   });
  //
  //   describe('Call', () => {
  //     it('Should throw if transport is not initialized', async () => {
  //       try {
  //         await instance.call('someEntity', 'someCommand', 'notExistingOne', {});
  //         throw new Error('Not reached!');
  //       } catch (err) {
  //         expect(err.message).toEqual('Transport notExistingOne not initialized yet!');
  //       }
  //     });
  //
  //     it('Calls transport instance and delegates the call', async () => {
  //       await instance.call('someEntity', 'someCommand', 'direct', {
  //         a: 'b',
  //       });
  //
  //       expect(transportMocks.call).toHaveBeenCalledWith('someEntity', 'someCommand', {
  //         a: 'b',
  //       });
  //     });
  //   });
  // });
});
