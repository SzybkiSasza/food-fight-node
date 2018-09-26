import configSchema from 'instance/schemas/config';

describe('Init config schema', () => {
  it('Is a defined object', () => {
    expect(configSchema).toBeInstanceOf(Object);
    expect(configSchema.isJoi).toEqual(true);
  });

  it('Requires entity name', () => {
    const validation = configSchema.validate({});
    expect(validation.error).toBeInstanceOf(Error);
    expect(validation.error.message).toMatch('["entityName" is required]');
  });

  it('Requires at least one transport', () => {
    const validation = configSchema.validate({
      entityName: 'Users',
      transports: [],
    });

    expect(validation.error).toBeInstanceOf(Error);
    expect(validation.error.message).toMatch(
      '["transports" must contain at least 1 items]',
    );
  });

  it('Throws an error if incorrect transport name is passed', () => {
    const config = {
      entityName: 'Users',
      transports: [
        {
          name: 'randomName',
        },
      ],
      timeout: 3000,
      debug: true,
    };

    const validation = configSchema.validate(config);

    expect(validation.error).toBeInstanceOf(Error);
    expect(validation.error.message).toMatch(
      '["name" must be one of [direct]]]',
    );
  });

  it('Sets default timeout and debug', () => {
    const config = {
      entityName: 'Users',
      transports: [
        {
          name: 'direct',
        },
      ],
    };

    const validation = configSchema.validate(config);

    expect(validation.error).toBeFalsy();
    expect(validation.value).toEqual(
      expect.objectContaining({
        debug: false,
        timeout: 10000,
      }),
    );
  });

  it('Allows to pass debug flag', () => {
    const config = {
      entityName: 'Users',
      transports: [
        {
          name: 'direct',
        },
      ],
      timeout: 3000,
      debug: true,
    };

    const validation = configSchema.validate(config);

    expect(validation.error).toBeFalsy();
    expect(validation.value).toEqual(config);
  });
});
