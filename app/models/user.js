const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')
const BaseModel = require('./model')

const Roles = {
  SuperAdmin: 'super-admin',
  InstitutionAdmin: 'institution-admin',
  BranchAdmin: 'branch-admin',
  Applicant: 'applicant',
  Developer: 'developer'
}

const Statuses = {
  Active: 'ACTIVE',
  Suspended: 'SUSPENDED',
  Deactivated: 'DEACTIVATED'
}

class UserModel extends BaseModel {

  static roles() {
