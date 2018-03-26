import { isArray } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import transports from '../transports';
import configSchema from './schemas/config';

const errorPrefix = '[FoodFight Instance]';

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
      validation.error.message = `${errorPrefix} ${validation.error.message}`;
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
    if (!this.config.transports || !this.config.transports.length) {
      throw new Error(`${errorPrefix} No transports in the config, cannot initialize!`);
    }

    const transportPromises = [];
    this.config.transports.forEach((transportConfig) => {
      const transportName = transportConfig.name;

      if (!transports[transportName]) {
        throw new Error(`${errorPrefix} Transport: ${transportName} not supported!`);
      }

      const TransportClass = transports[transportName];
      const transportInstance = new TransportClass(transportConfig);

      transportPromises.push(transportInstance.init());
    });

    const initializedTransports = await Promise.all(transportPromises);
    initializedTransports.forEach((initializedTransport) => {
      const transportName = initializedTransport.name;
      this.transports[transportName] = initializedTransport;
    });

    this.id = uuidV4();
    this.isInitialized = true;
  }

  /**
   * Listens to a particular command
   * @param  {String}  commandName Command name
   * @param  {Function}  handler   Command handler
   * @param  {Array}  transportNames   List of transports that will listen
   *                                to the command
   * @return {Promise}             Result of initialization
   */
  async listen(commandName, handler, transportNames = []) {
    if (!isArray(transportNames) || !transportNames.length) {
      throw new Error(`${errorPrefix} At least one transport must be specified!`);
    }

    const transportPromises = [];
    transportNames.forEach((transportName) => {
      const transportInstance = this.transports[transportName];

      // Skip the transport if it is not initialized
      if (!transportInstance) {
        return console.warn(`${errorPrefix} Skipping transport ${transportName}, not initialized...`); // eslint-disable-line no-console
      }

      return transportPromises.push(transportInstance.listen(commandName, handler));
    });

    await Promise.all(transportPromises);
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
      throw new Error(`${errorPrefix} Transport ${transportType} not initialized yet!`);
    }

    return transportInstance.call(entity, commandName, body);
  }
}
