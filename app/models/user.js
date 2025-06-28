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

  static isInstitutionAdmin(user) {
    return this.isSuperAdmin(user) || this.hasRole(user, Roles.InstitutionAdmin)
  }

  static isBranchAdmin(user) {
    return this.isInstitutionAdmin(user) || this.hasRole(user, Roles.BranchAdmin)
  }

  static isEmployee(user) {
    return this.hasRole(user, Roles.Employee)
      || this.isBranchAdmin(user)
      || this.isInstitutionAdmin(user)
      || this.isSuperAdmin(user)
  }

  static isApplicant(user) {
    return this.hasRole(user, 'applicant') && !this.isEmployee(user)
  }

  static isSuperior(sup, sub) {
    if (!sup) return false
    if (!sub) return true
    if (UserModel.isSuperAdmin(sub)) return false
    if (UserModel.isSuperAdmin(sup)) return true
    if (UserModel.isInstitutionAdmin(sub)) return false
    if (UserModel.isInstitutionAdmin(sup)) return true
    if (UserModel.isBranchAdmin(sub)) return false
    return UserModel.isBranchAdmin(sup)
  }

  static isSubordinate(sub, sup) {
    if (!sub) return true
    if (!sup) return false
    if (UserModel.isSuperAdmin(sub)) return false
    if (UserModel.isSuperAdmin(sup)) return true
    if (UserModel.isInstitutionAdmin(sub)) return false
    if (UserModel.isInstitutionAdmin(sup)) return true
    if (UserModel.isBranchAdmin(sub)) return false
    return UserModel.isBranchAdmin(sup)
  }

  static isPeer(user, other) {
    return !UserModel.isSuperior(user, other) && !UserModel.isSubordinate(user, other)
  }

  constructor(data) {
  }

  static props() {
    return ['id', 'email', 'password', 'firstName', 'lastName', 'createdAt', 'lastLoginAt', 'institutionId', 'branchId', 'roles', 'titles', 'workgroups', 'department', 'status', 'phone']
  }

  static relations() {
    return ['accounts', 'institution', 'branch']
  }
