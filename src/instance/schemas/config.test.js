import configSchema from './config';

describe('Init config schema', () => {
  it('Is a defined object', () => {
    expect(configSchema).toBeInstanceOf(Object);
    expect(configSchema.isJoi).toEqual(true);
  });

  it('Requires entity name', () => {

  });

  it('Requires at lease one transport', () => {

  });

  it('Allows to pass debug flag', () => {

  });

  it('Sets default timeout', () => {

  });

  it('Passes if correct options are passed', () => {

  });
});
