const app = require('../../core')
const Joi = require('@hapi/joi')
const NotImplementedError = require('../../errors/not_implemented')
// Temp comment
const validator = app.plugins.validator

const SCHEMAS = {
  method: Joi.string().required().valid('email', 'push', 'sms'),

  email: Joi.object().keys({
    taskId: Joi.string(),
    method: Joi.string().required().valid('email'),
    product: Joi.string().optional(),
