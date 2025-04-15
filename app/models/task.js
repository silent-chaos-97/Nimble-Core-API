const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const _ = require('lodash')

const Statuses = _.mapKeys(
  [
    'created',
