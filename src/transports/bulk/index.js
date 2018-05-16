import configSchema from 'transports/bulk/schemas/config';

const errorPrefix = '[FoodFight: Bulk Transport]';

export default class Bulk {
  constructor(config) {
    const transportConfigValidation = configSchema.validate(config);
    if (transportConfigValidation.error) {
      transportConfigValidation.error.message = `${errorPrefix} ${transportConfigValidation.error.message}`;
      throw transportConfigValidation.error;
    }

    // Copy validated and enriched config
    this.config = transportConfigValidation.value;
  }

  /**
   * Calls handler, pulling its instance from map and supplying body
   * @param entity
   * @param commandName
   * @param body
   * @returns {Promise<void>}
   */
  async call(entity, commandName, body) {
  }

  /**
   * Initialized communication with external service (RabbitMQ).
   * @returns {Promise<void>}
   */
  async init() {
  }

  /**
   * Adds new handler to direct handlers map
   * @param commandName
   * @param handler
   * @returns {Promise<void>}
   */
  async listen(commandName, handler) {
  }

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'bulk';
  }
}
