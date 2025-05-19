const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
// Temp comment
    institutionId: Joi.string().uuid(),
    sort: Joi.string().valid('name', '-name', 'id', '-id').default('name'),
    limit: Joi.number().positive(),
    offset: Joi.number().positive().allow(0),
  })
