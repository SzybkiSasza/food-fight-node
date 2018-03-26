import configSchema from './config';

describe('Direct Transport Config Schema', () => {
  it('should be a defined export', () => {
    expect(configSchema).toBeInstanceOf(Object);
  });

  it('should require original fields', () => {
    const configWithoutEntityName = {};

    const validation = configSchema.validate(configWithoutEntityName);

    expect(validation.error).toBeInstanceOf(Error);
    expect(validation.error.message).toMatch('["entityName" is required]');
  });
});
