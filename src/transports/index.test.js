jest.mock('transports/bulk');
jest.mock('transports/direct');

import BulkTransport from 'transports/bulk';
import DirectTransport from 'transports/direct';

import transportsIndex from 'transports';

describe('Transports index', () => {
  it('should be a defined object', () => {
    expect(transportsIndex).toBeInstanceOf(Object);
  });

  it('should expose two transports', () => {
    expect(Object.keys(transportsIndex)).toHaveLength(2);
    expect(transportsIndex.direct).toEqual(DirectTransport);
    expect(transportsIndex.bulk).toEqual(BulkTransport);
  });
});
