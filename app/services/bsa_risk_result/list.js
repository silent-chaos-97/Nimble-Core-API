const _ = require('lodash')
const app = require('../../core')
const BsaRiskResult = app.repositories.bsaRiskResult
const BsaRiskResultModel = app.models.bsaRiskResult
const schema = require('./schemas/filter')
const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.bsa_risk_results.list')

const sortBy = {
  position: 'bsa_risk_results.position ASC',
  '-position': 'bsa_risk_results.position DESC',

function getSqlSort(sort) {
  return _.get(sortBy, sort, sortBy['position'])
