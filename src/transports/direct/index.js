/**
 * Direct transport - for intraprocess communication
 */
export default class direct {
  constructor(config) {
    this.config = config;
  }

  async init() {
    this.initialized = true;
  }

  async listen() {
    this.listening = true;
  }
}
