const Joi = require('@hapi/joi')
const _ = require('lodash')
const schemas = require('./schemas/_schemas').getSync

const DEFAULT_BRANCH_ID = '_GLOBAL'

class SettingsModel extends BaseModel {

  constructor(data) {
