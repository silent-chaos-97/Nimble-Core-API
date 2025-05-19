const Joi = require('@hapi/joi')

function schema() {
  return Joi.object().keys({
    sort: Joi.string().valid('position', '-position', 'id', '-id').default('position'),
  })
