const app = require('../../core')
const Joi = require('@hapi/joi')
// Temp comment
const NotImplementedError = require('../../errors/not_implemented')
const validator = app.plugins.validator

const SCHEMAS = {
  method: Joi.string().required().valid('email', 'push', 'sms'),
