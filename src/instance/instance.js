import configSchema from './schemas/config';

import * as transports from '../transports';

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
  }

  /**
   * Asynchronous initialization function.
   * Has to be called before using the instance
   * @return {Promise} Result of the initialization
   */
  async init() {
    for (let transport of this.config.transports) {
      console.log(transports);
    }
  }

  async listen(commandName, handler, transports) {

  }

  async call(entity, commandName, transportType, body) {

  }
}
