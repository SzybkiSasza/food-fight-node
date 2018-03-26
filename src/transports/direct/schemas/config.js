import Joi from 'joi';

export default Joi.object().keys({
  entityName: Joi.string().min(1).required()
    .description('Entity name'),
  timeout: Joi.number().default(10000, 'Global instance timeout'),
  transportTimeout: Joi.number().default(10000, 'Direct transport timeout'),
});
