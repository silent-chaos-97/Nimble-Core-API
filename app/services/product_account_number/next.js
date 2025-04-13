const app = require('../../core')
const _ = require('lodash')
const moment = require('moment')
const Joi = require('@hapi/joi')
const ProductAccountNumber = app.repositories.productAccountNumber
const InternalServerError = require('../../errors/internal_server')
const { validator } = app.plugins
const logger = app.logger.getLogger('app.services.product_account_number.next')

const schema = function() {
  return Joi.object().keys({
    productId: Joi.string().uuid().required(),
    accountRequestId: Joi.string().uuid().required()
  })
