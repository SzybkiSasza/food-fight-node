import Joi from 'joi';

const bulkTransportConfigSchema = Joi.object().keys({
  name: 'bulk',
  entityName: Joi.string().min(1).required()
    .description('Entity name'),
  timeout: Joi.number().default(30000, 'Instance timeout'),
});

export default bulkTransportConfigSchema;
