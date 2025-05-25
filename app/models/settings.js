const Joi = require('@hapi/joi')
const _ = require('lodash')
const BaseModel = require('./model')
const schemas = require('./schemas/_schemas').getSync

const DEFAULT_BRANCH_ID = '_GLOBAL'

class SettingsModel extends BaseModel {

  constructor(data) {
    super(SettingsModel.props(), SettingsModel.relations(), data)
  }

  static defaultBranchId() {
    return DEFAULT_BRANCH_ID
  }

  static props() {
    return ['institutionId', 'branchId', 'key', 'collection', 'element', 'schema', 'data']
  }

  static prePersist(settings) {
    if (!settings) return {}
