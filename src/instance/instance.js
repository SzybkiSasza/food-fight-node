import * as transports from '../transports';

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

    // Copy validated and enriched config
    this.config = validation.value;

    // Indicates that the instance is not yet ready (has to be initialized)
    this.isInitialized = false;

    // Initial transports list
    this.transports = [];
  }

  /**
   * Asynchronous initialization function.
   * Has to be called before using the instance
   */
  async init() {
    for (let transportConfig of this.config.transports) {
      if (!transports[transportConfig.name]) {
        throw new Error(`Transport: ${transportConfig.name} not supported!`);
      }

      const transportClass = transports[transportConfig.name];
      const transportInstance = new transportClass(transportConfig);
      this.transports.push(await transportInstance.init());
    }

    this.isInitialized = true;
  }

  async listen(commandName, handler, transports) {

  }

  async call(entity, commandName, transportType, body) {

  }
}
