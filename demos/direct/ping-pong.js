// This assumes that library is built!
const Promise = require('bluebird');
const foodFight = require('../../lib');

const config = {
  entityName: 'PingPongTest',
  timeout: 500,
  transports: [{
    name: 'direct',
  }],
};

/**
 * Pings the message
 */
async function ping({ counter }) {
  if (counter < 10) {
    const result = await foodFight.call('PingPongTest', 'pong', 'direct', {
      counter: counter || 0,
    });
    console.log(`Ping result: ${result}`);
  } else {
    console.log('Ping Pong finished');
  }
}

/**
 * Pongs the message and sometimes... Times out :)
 */
async function pong() {
  await Promise.delay
  const result = await foodFight.call('PingPongTest', 'ping', 'direct', {});
  console.log(`Pong result: ${result}`);
}

async function run() {
  await foodFight.init(config);

  await foodFight.listen('ping', ping, ['direct']);
  await foodFight.listen('pong', pong, ['direct']);

  await foodFight.call('PingPongTest', 'ping', 'direct', {
    counter: 0,
  });
}

// This actually triggers the neverending loop
run().catch((err) => {
  console.log('Error encountered!');
  console.log(err);
});
