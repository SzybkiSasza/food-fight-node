import Instance from './instance';

const errorPrefix = '[FoodFight Main]';

let instance;

/**
 * Checks if instance is initialized
 * @return {Error|Boolean} Error, if instance is not initialized
 */
function checkInstance() {
  if (!instance) {
    throw new Error(`${errorPrefix} Instance not initialized!`);
  }

  return true;
}

/**
 * Initializes instance or returns existing one
 * @param  {Object}  config   Input config
 * @return {Promise}          Result of the initialization
 */
export async function init(config) {
  if (!instance) {
    instance = new Instance(config);

    try {
      return await instance.init();
    } catch (err) {
      instance = null;

      console.error(`${errorPrefix} Instance initialization failed! Check your config`); // eslint-disable-line no-console
      throw err;
    }
  }

  throw new Error(`${errorPrefix} Instance already initialized!`);
}

/**
 * Delegates adding new listener to the instance
 * @param  {String}     commandName   Command name to listen to
 * @param  {Function}   handler       Handler to call on action
 * @param  {Array}      transports    List of transports to attach handler to
 * @return {Promise<Boolean>}         Result of listening
 */
export async function listen(commandName, handler, transports) {
  checkInstance();
  return instance.listen(commandName, handler, transports);
}

/**
 * Delegates call to instance
 * @param  {String}     entity        Entity name to send command to
 * @param  {String}     commandName   Command name to send
 * @param  {String}     transportType Transport to use for call
 * @param  {Object}     body          Request body
 * @return {Promise<Object>}          Result of the call, if provided
 */
export async function call(entity, commandName, transportType, body) {
  checkInstance();
  return instance.call(entity, commandName, transportType, body);
}
