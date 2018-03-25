import {isArray} from 'lodash';
import {v4 as uuidV4} from 'uuid';

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

    this.id = uuidV4();
    this.isInitialized = true;
  }

  /**
   * Listens to a particular command
   * @param  {String}  commandName Command name
   * @param  {Function}  handler   Command handler
   * @param  {Array}  transports   List of transports that will listen
   *                                to the command
   * @return {Promise}             Result of initialization
   */
  async listen(commandName, handler, transports = []) {
    if (!isArray(transports) || !transports.length) {
      throw new Error('At least one transport must be specified!');
    }

    for (let transport of transports) {
      const transportInstance = this.transports[transport];
      // Skip the transport if it is not initialized
      if (!transportInstance) {
        return console.warn(
          `Skipping transport ${transport}, not initialized...`);
      }

      await transportInstance.listen(commandName, handler);
    }
  }

  /**
   * Calls particular transport to handle the message
   * @param  {String}  entity        Entity name to call
   * @param  {String}  commandName   Command name to invoke
   * @param  {String}  transportType One of allowed transports
   * @param  {Object}  body          Message body
   * @return {Promise}               Result of the operation
   */
  async call(entity, commandName, transportType, body) {
    const transportInstance = this.transports[transportType];
    if (!transportInstance) {
      throw new Error(`Transport ${transportType} not initialized yet!`);
    }

    return transportInstance.call(entity, commandName, body);
  }
}
