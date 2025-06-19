const _ = require('lodash')
const Joi = require('@hapi/joi')
const app = require('../../../core')
const numbers = app.plugins.numbers
const log = app.logger.getLogger('app.services.risk.calculators._ratio')

const OPTS_SCHEMA_PROPS = {
  institutionId: Joi.string().uuid().required(),
  numerator: Joi.number().positive().allow(0).required(),
  denominator: Joi.number().positive().required(),
  performing: Joi.string().valid('>', '>=', '=', '<=', '<').required(),
  disqualifying: Joi.string().valid('>', '>=', '=', '<=', '<').required(),
  precision: Joi.number().positive().optional()
}

const OPTS_SCHEMA = Joi.object().keys(OPTS_SCHEMA_PROPS)

const PERFORMANCE_CALC = {
  '>': (ratio, performanceStandard) => ratio > performanceStandard,
  '>=': (ratio, performanceStandard) => ratio >= performanceStandard,
  '<=': (ratio, performanceStandard) => ratio <= performanceStandard,
  '<': (ratio, performanceStandard) => ratio < performanceStandard
}
module.exports = async function(risk, _opts) {
  log.info({ _opts, risk })

  try {
    const opts = app.plugins.validator(_.pick(_opts, _.keys(OPTS_SCHEMA_PROPS)), OPTS_SCHEMA, { abortEarly: false })

    const precision = _opts.precision || 3
    const performanceStandard = numbers.toNumber(risk.performance_standard)
    let highPerformanceStandard = risk.high_performance_standard ? numbers.toNumber(risk.high_performance_standard) : performanceStandard
    if (!_.isFinite(highPerformanceStandard)) highPerformanceStandard = performanceStandard

    const numerator = numbers.toNumber(opts.numerator)
    const denominator = numbers.toNumber(opts.denominator)
    const ratio = _.round(numerator / denominator, precision)

    const maxAbsoluteNumerator = _.round(performanceStandard * denominator, 2)
    const maxAdditionalNumerator = _.round(maxAbsoluteNumerator - numerator, 2)

    const numeratorKey = _.get(_opts, ['_', 'numerator'], 'numerator')
    const denominatorKey = _.get(_opts, ['_', 'denominator'], 'denominator')

    const calculated = {
      _: {
        numerator,
        denominator,
        ratio
      }
    }

    calculated[numeratorKey] = numerator
    calculated[denominatorKey] = denominator
    calculated[`${numeratorKey}_to_${denominatorKey}`] = ratio
    const performing = PERFORMANCE_CALC[opts.performing]
    calculated.performing = performing(ratio, performanceStandard)
    if (calculated.performing) {
      calculated.high_performing = performing(ratio, highPerformanceStandard)
      calculated.relativePerformance = relativePerformance(performing, ratio, performanceStandard, highPerformanceStandard)
    }
    calculated[`max${_.upperFirst(_.camelCase(numeratorKey))}`] = {
      absolute: maxAbsoluteNumerator,
      additional: maxAdditionalNumerator
    }

    const disqualifyingStandard = numbers.toNumber(risk.disqualifying_metric)

    log.info({ risk, disqualifyingStandard })

    calculated.disqualifying = _.isFinite(disqualifyingStandard)
      ? PERFORMANCE_CALC[opts.disqualifying](ratio, disqualifyingStandard)
      : false // if there is no disqualifier, this risk is not disqualified

    return calculated
  } catch(err) {
    return Promise.reject(err)
  }
}

function relativePerformance(performing, ratio, std, high) {
  if (std === high || performing(ratio, high)) return 1 // 100% relative performance

  return (high > std)
    ? (ratio - std) / (high - std)
    : (std - ratio) / (std - high)
