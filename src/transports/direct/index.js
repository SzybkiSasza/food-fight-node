import configSchema from './schemas/config';

const errorPrefix = '[FoodFight: Direct Transport] ';

/**
 * Direct transport - for intraprocess communication
 */
export default class Direct {
  constructor(config) {
    const validation = configSchema.validate(config);
    if (validation.error) {
      validation.error.message = `${errorPrefix} ${validation.error.message}`;
      throw validation.error;
    }

    // Copy validated and enriched config
    this.config = validation.value;

    this.commandMap = new Map();
  }

  /**
   * Calls handler, pulling its instance from map and supplying body
   * @param entity
   * @param commandName
   * @param body
   * @returns {Promise<void>}
   */
  async call(entity, commandName, body) {
    const thisEntityName = this.config.entityName;
    if (entity !== thisEntityName) {
      throw new Error(`${errorPrefix} Trying to call handler with wrong instance name: ${entity}`);
    }

    const handler = this.commandMap.get(thisEntityName + commandName);
    if (!handler) {
      throw new Error(`${errorPrefix} Handler was not yet added to transport: ${commandName}`);
    }

    return handler(body);
  }

  /**
   * This is a no-op for Direct, as we don't have to initialize any external transports
   * @returns {Promise<Direct>}
   */
  async init() {
    return this;
  }

  /**
   * Adds new handler to direct handlers map
   * @param commandName
   * @param handler
   * @returns {Promise<void>}
   */
  async listen(commandName, handler) {
    const existingHandler = this.commandMap.get('commandName');
    if (existingHandler) {
      throw new Error(`${errorPrefix} Trying to add new handler to existing command: ${commandName}`);
    }

    if (!(handler instanceof Function)) {
      throw new Error(`${errorPrefix} Handler must be a function!`);
    }

    this.commandMap.set(this.config.entityName + commandName, handler);
  }

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'direct';
  }
}
