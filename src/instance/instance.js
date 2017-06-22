import configSchema from './schemas/config';

/**
 * Instance class - contains init code and transport - handling facets
 */
export default class Instance {
  /**
   * Attaches config to the Instance
   * @param  {Object} config Config to be validated and built
   */
  constructor(config) {
    const validation = configSchema.validate(config);
    if (validation.error) {
      throw validation.error;
    }
  }

  async listen(commandName, handler, transports) {

  }

  async call(entity, commandName, transportType, body) {

  }
}
