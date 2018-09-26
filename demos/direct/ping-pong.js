// This assumes that library is built!
const Promise = require('bluebird');
const foodFight = require('../../lib');

const config = {
  entityName: 'PingPongTest',
  timeout: 500,
  transports: [
    {
      name: 'direct',
    },
  ],
};

/**
 * Pings the message
 */
async function ping({ counter }) {
  console.log(`Ping: ${counter}`);

  // Ping-pong will stop after 10 cycles
  if (counter < 10) {
    const updatedCounter = await foodFight.call(
      'PingPongTest',
      'pong',
      'direct',
      {
        counter,
      },
    );

    console.log(`Counter after pong: ${updatedCounter}`);
    return updatedCounter;
  }

  // This will be reached after recursion is finished
  console.log(`Final counter: ${counter}`);
  return counter;
}

/**
 * Pongs the message and sometimes... Times out :)
 */
async function pong({ counter }) {
  console.log(`Pong: ${counter}`);

  // Just delay it a little...
  await Promise.delay(50);
  const incrementedCounter = counter + 1;

  const pingedCounter = await foodFight.call('PingPongTest', 'ping', 'direct', {
    counter: incrementedCounter,
  });

  // This will be reached after recursion is finished
  console.log(`Counter after ping: ${pingedCounter}`);
  return pingedCounter;
}

async function run() {
  // Initialize the lib
  await foodFight.init(config);

  // Add both endpoints
  await foodFight.listen('ping', ping, ['direct']);
  await foodFight.listen('pong', pong, ['direct']);

  // This will trigger recursive runs!
  await foodFight.call('PingPongTest', 'ping', 'direct', {
    counter: 0,
  });
}

run().catch(err => {
  // This should show how timeout is caught in global context
  console.log('Error encountered!');
  console.log(err);
});
