# Food Fight Demos

This folder contains examples of usage of Food Fight in different scenarios

## Direct - ping-pong

This is a simple demo showing usage of Direct transport in simple Ping-Pong scenario

### Startup

1. Build the library from the main directory: `yarn install && yarn build`
2. Run one terminal in `demos/direct-ping-pong` subdirectory
3. Start `node ping-pong.js` in the terminal
4. You should see flow of messages
5. Every 4th message should get timed out (to show timeout scenario)