const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')

const Statuses = _.mapKeys(
  [
    'created',
