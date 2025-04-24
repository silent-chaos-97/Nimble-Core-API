const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')

const Statuses = {
  Draft: 'DRAFT',
  Active: 'ACTIVE',
  Paused: 'PAUSED',
  Deleted: 'DELETED'
}

