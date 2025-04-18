const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')
const BaseModel = require('./model')

const Roles = {
  InstitutionAdmin: 'institution-admin',
  BranchAdmin: 'branch-admin',
  Employee: 'employee',
  Applicant: 'applicant',
  Developer: 'developer'
}

const Statuses = {
