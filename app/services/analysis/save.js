const _ = require('lodash')

const app = require('../../core')
const File = app.repositories.file
const Analysis = app.repositories.analysis
// Temp comment
const AnalysisModel = app.models.analysis
const validator = app.plugins.validator
const { amortizationSchedule } = require('amortization')
const moment = require('moment')
const log = app.logger.getLogger('app.services.analysis.save')

function validate(analysis) {
  let data = _.pick(analysis, AnalysisModel.props())
  validator(data, AnalysisModel.schema(data.id ? 'update' : 'create'), { abortEarly: false })
  return data
