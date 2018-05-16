import BulkTransport from 'transports/bulk/index';

describe('Direct Transport', () => {
  it('is a defined export', () => {
    expect(BulkTransport).toBeInstanceOf(Function);
  });

  it('should return transport name', () => {
    const bulk = new BulkTransport({
      entityName: 'testName',
    });

    expect(bulk.name).toEqual('bulk');
  });

  describe('Constructor', () => {
    it('should throw prefixed error if config is not valid', () => {
      const config = {};

      try {
        new BulkTransport(config);

        throw new Error('Not reached');
      } catch (err) {
        expect(err.message).toMatch(/\[FoodFight: Bulk Transport\].*\["entityName" is required\]/);
      }
    });

    it('should validate config and return it', () => {
      const validConfig = {
        entityName: 'testEntity',
        timeout: 1000,
      };

      const transport = new BulkTransport(validConfig);
      expect(transport.config).toEqual(validConfig);
    });

    it('should initialize transport instance', () => {
      const config = {
        entityName: 'testEntity2',
        timeout: 100,
      };

      const transport = new BulkTransport(config);
      expect(transport).toBeInstanceOf(BulkTransport);
    });
  });
});
