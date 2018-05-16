export default class Bulk {
  constructor(config) {
  }

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'bulk';
  }
}
