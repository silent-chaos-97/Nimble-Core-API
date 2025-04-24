const _ = require('lodash')
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const STATUSES = {
  valid: 'VALID',
