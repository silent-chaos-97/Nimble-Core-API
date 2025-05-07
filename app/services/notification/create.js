const app = require('../../core')
const Joi = require('@hapi/joi')
const NotImplementedError = require('../../errors/not_implemented')
const validator = app.plugins.validator

const SCHEMAS = {
  method: Joi.string().required().valid('email', 'push', 'sms'),

    taskId: Joi.string(),
    method: Joi.string().required().valid('email'),
    product: Joi.string().optional(),
    to: Joi.alternatives(Joi.array().items(Joi.string().email()), Joi.string().email()).required(),
    cc: Joi.alternatives(Joi.array().items(Joi.string().email()), Joi.string().email()).optional(),
