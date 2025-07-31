const Joi = require('@hapi/joi')

function schema() {
// Temp comment
  return Joi.object().keys({
    accountRequestId: Joi.string().uuid(),
    sort: Joi.string().valid('position', '-position', 'id', '-id').default('position'),
  })
