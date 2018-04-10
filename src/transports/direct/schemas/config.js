import Joi from 'joi';

const directTransportConfigSchema = Joi.object().keys({
  name: 'direct',
  entityName: Joi.string().min(1).required()
    .description('Entity name'),
  timeout: Joi.number().default(10000, 'Instance timeout'),
});

export default directTransportConfigSchema;
