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

  get name() {
    return this.constructor.name;
  }

  static get name() {
    return 'bulk';
  }
}
