jest.mock('./direct');

import transportsIndex from './';
import DirectTransport from './direct';

describe('Transports index', () => {
  it('should be a defined object', () => {
    expect(transportsIndex).toBeInstanceOf(Object);
  });

  it('should expose one transport', () => {
    expect(transportsIndex.direct).toEqual(DirectTransport);
  });
});
