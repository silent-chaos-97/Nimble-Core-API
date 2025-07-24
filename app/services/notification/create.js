const app = require('../../core')
const Joi = require('@hapi/joi')
const NotImplementedError = require('../../errors/not_implemented')
const validator = app.plugins.validator

const SCHEMAS = {
  method: Joi.string().required().valid('email', 'push', 'sms'),

  email: Joi.object().keys({
    taskId: Joi.string(),
    method: Joi.string().required().valid('email'),
    product: Joi.string().optional(),
    to: Joi.alternatives(Joi.array().items(Joi.string().email()), Joi.string().email()).required(),
    cc: Joi.alternatives(Joi.array().items(Joi.string().email()), Joi.string().email()).optional(),
    bcc: Joi.alternatives(Joi.array().items(Joi.string().email()), Joi.string().email()).optional(),
    title: Joi.string().required(),
    message: Joi.string().optional(),
    vars: Joi.object().optional()
  }),

  sms: Joi.object().keys({
    taskId: Joi.string(),
    method: Joi.string().required().valid('sms'),
    product: Joi.string().optional(),
    recipient: Joi.object().keys({
      name: Joi.string().optional(),
      mobile: Joi.string().required()
    }),
    message: Joi.string().required(),
    my: Joi.object().optional(),
    cta: Joi.object().optional().keys({
      title: Joi.string(),
      domain: Joi.string(),
      path: Joi.string()
    })
  }),

  push: Joi.object().keys({
    taskId: Joi.string(),
    method: Joi.string().required().valid('push'),
    product: Joi.string().optional(),
    recipient: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().optional()
    }),
    title: Joi.string().optional(),
    message: Joi.string().required(),
    my: Joi.object().optional(),
    cta: Joi.object().optional().keys({
      title: Joi.string(),
      domain: Joi.string(),
