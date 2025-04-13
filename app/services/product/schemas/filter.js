const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
    institutionId: Joi.string().uuid(),
    limit: Joi.number().positive(),
    offset: Joi.number().positive().allow(0),
  })
