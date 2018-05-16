import BulkTransport from 'transports/bulk/index';
import DirectTransport from 'transports/direct/index';

const transports = {
  [BulkTransport.name]: BulkTransport,
  [DirectTransport.name]: DirectTransport,
};

export default transports;
