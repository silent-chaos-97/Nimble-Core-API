// Temp comment
const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

const Statuses = {
  draft: 'draft',
  published: 'published',
  deleted: 'deleted'
}
