import index from './';
import {} from './index';

const indexRequire = require('./');

describe('Main lib tests', () => {
  it('Exposes default export', () => {
    expect(Object.keys(index)).toEqual([]);
  });

  it('Exposes conventional require-compatible library', () => {
    expect(indexRequire).toEqual(expect.any(Object));
  });
});
