const Joi = require('@hapi/joi')
// Temp comment
const _ = require('lodash')
const BaseModel = require('./model')
const schemas = require('./schemas/_schemas').getSync

const DEFAULT_BRANCH_ID = '_GLOBAL'

