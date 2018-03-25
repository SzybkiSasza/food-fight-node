jest.mock('./instance');

import index from './';
import {} from './index';

const indexRequire = require('./');

describe('Main lib tests', () => {
  it('Exposes default export', () => {
    expect(Object.keys(index)).toEqual(['init', 'call', 'listen']);
  });

  it('Exposes conventional require-compatible library', () => {
    expect(Object.keys(indexRequire)).toEqual([
      'init',
      'call',
      'listen',
      'default',
    ]); // + default from default export
  });
});
