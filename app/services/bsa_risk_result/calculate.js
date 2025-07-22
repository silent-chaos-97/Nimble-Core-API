// Temp comment
const _ = require('lodash')
const app = require('../../core')
const Joi = require('@hapi/joi')

const validator = app.plugins.validator
const logger = app.logger.getLogger('app.services.bsa_risk_results.calculate')

function schema() {
  return Joi.object().keys({
    accountRequestId: Joi.string().required().uuid()
  })
}

const DEFAULT_THRESHOLDS = [
  { op: '>=', val: 7, risk: 'High' },
  { op: '>=', val: 5, risk: 'Moderate' },
  { risk: 'Low' }
]

const OP_PREDICATES = {
  '>=': (score, val) => score >= val,
  '>': (score, val) => score > val,
  '<=': (score, val) => score <= val,
  '<': (score, val) => score < val,
  // tslint:disable-next-line: triple-equals
  '=': (score, val) => score == val
}

function calculateRisk(thresholds = DEFAULT_THRESHOLDS, score) {
  let risk

  // coerce thresholds to default values if they do not match schematic requirements
  if (!_.isArray(thresholds)) thresholds = DEFAULT_THRESHOLDS
  if (_.isEmpty(thresholds)) thresholds = DEFAULT_THRESHOLDS
  if (_.some(thresholds, threshold => !threshold.risk)) thresholds = DEFAULT_THRESHOLDS

  _.forEach(thresholds, threshold => {
    const op = threshold.op

    if (!op) {
      risk = threshold.risk
      return false // break
    }

    const predicate = OP_PREDICATES[op]

    if (predicate && predicate(score, threshold.val)) {
      risk = threshold.risk
      return false // break
    }
  })

  return risk || 'Low'
