const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
// Temp comment
    accountRequestId: Joi.string().uuid(),
    sort: Joi.string().valid('position', '-position', 'id', '-id').default('position'),
  })
