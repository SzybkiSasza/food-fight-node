/**
 * Direct transport - for intraprocess communication
 */
export default class Direct {
  constructor(config) {
    this.config = config;
  }

  async call() {
    this.called = true;
  }

  async init() {
    this.initialized = true;

    return this;
  }

  async listen() {
    this.listening = true;
  }

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'direct';
  }
}
