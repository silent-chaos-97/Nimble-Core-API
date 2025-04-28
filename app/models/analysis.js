const Joi = require('@hapi/joi')
const BaseModel = require('./model')
const app = require('../core')
const _ = require('lodash')

const Statuses = {
  draft: 'draft',
  published: 'published',
  deleted: 'deleted'
}

const SCHEMA = Joi.object().keys({
  id: Joi.string().uuid(),
  createdById: Joi.string().uuid().required(),
  updatedById: Joi.string().uuid().required(),

  branchId: Joi.string().uuid(),
