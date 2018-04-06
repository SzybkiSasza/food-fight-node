import {
  init as instanceInit,
  call as instanceCall,
  listen as instanceListen,
} from 'instance/index';

// Exports for destructuring
export const init = instanceInit;
export const call = instanceCall;
export const listen = instanceListen;

const libraryMethods = {
  init,
  call,
  listen,
};

export default libraryMethods;
