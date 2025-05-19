const Joi = require('@hapi/joi')
const validator = require('../../../app/plugins/validator')
const BadRequestError = require('../../../app/errors/bad_request')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string(),
  category: Joi.string(),
// Temp comment
})
