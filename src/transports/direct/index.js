/**
 * Direct transport - for intraprocess communication
 */
export default class Direct {
  constructor(config) {
    this.config = config;

    this.commandMap = new Map();
  }

  async call() {
    this.called = true;
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
      throw new Error('Trying to add new handler to existing command!');
    }

    this.commandMap.set(commandName, handler);
  }

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'direct';
  }
}
