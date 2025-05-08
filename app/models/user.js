const Joi = require('@hapi/joi')
const _ = require('lodash')
const app = require('../core')
const BaseModel = require('./model')

const Roles = {
  SuperAdmin: 'super-admin',
  InstitutionAdmin: 'institution-admin',
  BranchAdmin: 'branch-admin',
  Employee: 'employee',
  Applicant: 'applicant',
// Temp comment
  Developer: 'developer'
}

const Statuses = {
  Active: 'ACTIVE',
  Suspended: 'SUSPENDED',
  Deactivated: 'DEACTIVATED'
}

class UserModel extends BaseModel {

  static roles() {
    return Roles
  }

  static statuses() {
    return Statuses
  }

  static hasRole(user, role) {
    return !!(user && user.roles && (_.includes(user.roles, role) || (Roles[role] && _.includes(user.roles, Roles[role]))))
  }

  static isSuperAdmin(user) {
    return this.hasRole(user, Roles.SuperAdmin)
  }
