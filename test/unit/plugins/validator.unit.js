const Joi = require('@hapi/joi')
const BadRequestError = require('../../../app/errors/bad_request')

const schema = Joi.object().keys({
