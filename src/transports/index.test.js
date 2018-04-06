jest.mock('transports/direct');

import transportsIndex from 'transports';
import DirectTransport from 'transports/direct';

describe('Transports index', () => {
  it('should be a defined object', () => {
    expect(transportsIndex).toBeInstanceOf(Object);
  });

  it('should expose one transport', () => {
    expect(transportsIndex.direct).toEqual(DirectTransport);
  });
});
