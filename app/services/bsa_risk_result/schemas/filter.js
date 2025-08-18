const Joi = require('@hapi/joi')

function schema() {
    accountRequestId: Joi.string().uuid(),
    sort: Joi.string().valid('position', '-position', 'id', '-id').default('position'),
  })
