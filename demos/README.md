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

### Implementation explanation

1. We start by calling `ping` with counter that equals `0`. 
2. We call `pong` from within `ping` with provided counter
3. We call `ping` from within `pong` with **increased** counter
4 We rinse and repeat until counter reaches `10`
5 As we delay each `pong` by 50ms and out max timeout equals 500ms, last pings and pongs are timed out 
    * Notice that we are still waiting for the outermost ping resolution - this is the one that reaches timeout!
6. All the pings and pongs are resolved with final counters (no more recurrency, returning final counter)
    * Notice that we get 20 (well, actually - 19) final messages (2 for each `ping-pong` pair), as we have 10 `ping-pong` cycles