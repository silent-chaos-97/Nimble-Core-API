const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
    institutionId: Joi.string().uuid(),
    sort: Joi.string().valid('name', '-name', 'id', '-id').default('name'),
    offset: Joi.number().positive().allow(0),
  })
