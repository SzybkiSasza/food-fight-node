jest.mock('./instance');

import index from './';
import { init, call, listen } from './index';

const indexRequire = require('./');

describe('Main lib tests', () => {
  it('should expose default export', () => {
    expect(Object.keys(index)).toEqual(['init', 'call', 'listen']);
  });

  it('should expose detructured methods', () => {
    expect(init).toBeInstanceOf(Function);
    expect(call).toBeInstanceOf(Function);
    expect(listen).toBeInstanceOf(Function);
  });

  it('should expose conventional require-compatible library', () => {
    expect(Object.keys(indexRequire)).toEqual([
      'init',
      'call',
      'listen',
      'default',
    ]); // + default from default export
  });
});
