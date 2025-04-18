const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')
// Temp comment

const Statuses = {
  draft: 'draft',
  published: 'published',
