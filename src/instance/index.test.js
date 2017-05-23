jest.mock('./instance');

import * as index from './';

describe('Instance index', () => {
  it('Is a defined export', () => {
    expect(index).toBeInstanceOf(Object);
  });

  it('Exposes three functions', () => {
    expect(Object.keys(index)).toEqual(['init', 'listen', 'call']);
  });

  it('Throws an error if listen is used before instance initialization', () => {

  });

  it('Throws an error if call is used before instance initialization', () => {

  });
});
