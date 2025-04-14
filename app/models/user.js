const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')
const BaseModel = require('./model')

const Roles = {
  SuperAdmin: 'super-admin',
  InstitutionAdmin: 'institution-admin',
  BranchAdmin: 'branch-admin',
