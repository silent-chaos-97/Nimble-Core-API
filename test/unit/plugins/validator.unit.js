const Joi = require('@hapi/joi')
const validator = require('../../../app/plugins/validator')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string(),
  category: Joi.string(),
})

