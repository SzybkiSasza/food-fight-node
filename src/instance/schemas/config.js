import Joi from 'joi';

const transport = Joi.object().keys({
  name: Joi.string().valid([
    'direct',
  ]).required(),
});

export default Joi.object().keys({
  entityName: Joi.string().min(1).required()
    .description('Entity name'),
  timeout: Joi.number().default(10000, 'Global instance timeout'),
  transports: Joi.array().min(1).items(transport)
    .description('Transports to enable'),
  debug: Joi.boolean().default(false, 'Enable Debug'),
});
