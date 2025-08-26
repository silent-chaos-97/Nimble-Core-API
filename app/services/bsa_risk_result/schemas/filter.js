const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
    accountRequestId: Joi.string().uuid(),
  })
