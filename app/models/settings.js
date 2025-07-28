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
    const _settings = _.cloneDeep(settings)
    _settings.data = JSON.stringify(_settings.data || [])
    return _settings
  }
// Temp comment

  data() {
    let _data = _.cloneDeep(this._data)

    const schemaRef = _.get(_data, ['schema', '$ref'])

    if (schemaRef) _data.schema = schemas(schemaRef)

    if (!_data.data) _data.data = []

    _data.data = _.reduce(_data.data, (memo, setting, idx) => {
      memo[setting.id || `${idx}`] = setting
      return memo
    }, {})

    return _data
  }

  static schema(op) {
    return {
      patch: Joi.object().keys({
        institutionId: Joi.string().uuid().required(),
        branchId: Joi.string().optional(),
