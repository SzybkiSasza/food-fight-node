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

    // Initial transports list
    this.transports = {};

    // Flag whether the Instance is initialized or not
    this.isInitialized = false;
  }

  /**
   * Asynchronous initialization function.
   * Has to be called before using the instance
   */
  async init() {
    for (let transportConfig of this.config.transports) {
      const transportName = transportConfig.name;
      if (!transports[transportName]) {
        throw new Error(`Transport: ${transportName} not supported!`);
      }

      const TransportClass = transports[transportName];
      const transportInstance = new TransportClass(transportConfig);

      this.transports[transportName] = await transportInstance.init();
    }

    this.isInitialized = true;
  }

  async listen(commandName, handler, transports) {

  }

  async call(entity, commandName, transportType, body) {

  }
}
