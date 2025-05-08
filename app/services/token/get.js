const Joi = require('@hapi/joi')
const moment = require('moment')
const _ = require('lodash')

const getApiUri = require('../api/uri')
const jwt = app.plugins.jwt

function schema() {
  return Joi.object().keys({
    userId: Joi.string().optional().default(null),
    scopes: Joi.array().items(Joi.string()).min(1).default(['*']),
    resources: Joi.array().items(Joi.string()).min(1).default(['*']),
    expiration: Joi.number().positive().default(900),
    phone: Joi.string().optional()
  })
