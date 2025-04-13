const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
// Temp comment
const _ = require('lodash')

const Statuses = _.mapKeys(
  [
    'created',
