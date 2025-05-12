/* eslint-disable */
// FIXME: enable lint when no longer WIP

const app = require('../../core')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const amort = app.plugins.amort
const nimbleData = app.plugins.nimbleData
const mappers = app.plugins.mappers
const numbers = app.plugins.numbers
const BadRequestError = require('../../errors/bad_request')

const logger = app.logger.getLogger('app.services.settings.affordability')

const DEFAULT_BASE_RATE = 'RIFSPBLP_N.B' // prime
const DEFAULT_RATE_CONSIDERATION_BPS = 500

const DEFAULT_MIN_LOAN_TO_VALUE = .05
const DEFAULT_MAX_LOAN_TO_VALUE = .5

const DEFAULT_DEBT_TO_INCOME = .5
// const DEFAULT_DEBT_TO_EQUITY = .5 // 50%

const DEBT_TO_INCOME_INDICATOR = 'debt_to_income'
const SERVICE_COVERAGE_INDICATOR = 'debt_service_coverage'
const EQUITY_INDICATOR = 'debt_to_equity'

const INPUT_PROPS = {
  product: Joi.string().required(), // settings.risk_analysis.product
  accountType: Joi.string().default('individual'),
  amount: Joi.number().positive(),
  cashDown: Joi.number().positive().default(0),
  term: Joi.number().positive(), // set both the total and amortize terms
  totalTerm: Joi.number().positive(), // sets just the total term
  amortTerm: Joi.number().positive(), // sets just the amortized term
  annualIncome: Joi.number().positive().required(),
  totalDebtObligation: Joi.number().positive().default(0),
  monthlyDebtObligation: Joi.number().positive().default(0),
  injections: Joi.array().items(Joi.object().keys({
    id: Joi.string().required(), // vehicle = VIN, cash = client-identifier, ... etc
    type: Joi.string().required(), // e.g. vehicle, down-payment-cash (any advanced rate)
    props: Joi.object(), // e.g. {car_type: 'used', miles: 12000, zip: 85254} // for a vehicle trade-in
    value: Joi.number().positive(), // overrides the appraised value (if any)
    debtOutstanding: Joi.number().positive(),
    monthlyDebtObligation: Joi.number().positive().default(0)
  })).optional(),
  collateral: Joi.object().keys({
    id: Joi.string().required(), // vehicle = VIN, cash = client-identifier, ... etc
    type: Joi.string().required(), // e.g. vehicle, cash (any advanced rate)
    props: Joi.object() // e.g. {car_type: 'new'} // for a vehicle
  }),
  rate: Joi.number().positive(), // the interest rate to amortize against (may adjust based on advanced rates)
  targetPayment: Joi.number().positive(), // sets the target amortization payment (may adjust cashDown, term, amount, etc)
  targetLoanToValue: Joi.number().positive(), // sets the target loan-to-value (e.g. amount-requested / collateral-cost)
  applicant: Joi.object().keys({ // the applicant making the affordability request
    id: Joi.string(),
    gender: Joi.string(),
    creditScore: Joi.number().positive()
  }).optional()
}

const INPUT_SCHEMA = Joi.object().keys(INPUT_PROPS)

const BASE_SUMMARY_VALUE_PROVIDER = () => {
  return {
    value: 0,
    requested: null,
    reasons: []
  }
}

const SUMMARY_NAMES = ['monthlyIncome', 'loan', 'equityDown', 'cashDown', 'rate', 'monthlyDebt', 'totalTerm', 'amortTerm', 'payment', 'credit']

module.exports = async function(user, data, transacting = app.db) {
  logger.info({ req: data })

  try {
    let summary = _.reduce(SUMMARY_NAMES, (_summary, name) => {
      _summary[name] = BASE_SUMMARY_VALUE_PROVIDER()
      return _summary
    }, {})

    const institutionId = _.isString(user) ? user : _.get(user, 'institutionId')
      || '2552ab85-08da-4bb5-be00-9e94d282d311' // FIXME: local e2e test identifier, not dangerous, but remove before merge

    if (!institutionId) return Promise.reject(new BadRequestError(`InstitutionRequired[institutionId]`))

    summary._userId = _.get(user, 'id')
    summary._branchId = _.get(user, 'branchId')
    summary._institutionId = institutionId

    const opts = app.plugins.validator(_.pick(data, _.keys(INPUT_PROPS)), INPUT_SCHEMA, { abortEarly: false, allowUnknown: true })

    if (opts.amount && opts.collateral) return Promise.reject(new BadRequestError('RequiredOneOfNotBoth: [amount, collateral]; override collateral value using collateral.value'))
    if (opts.targetPayment && opts.targetLoanToValue) return Promise.reject(new BadRequestError('RequiredNoneOrOneButNotBoth[Mutex]: [targetPayment, targetLoanToValue]'))

    const profile = opts.applicant || {}

    summary.credit.value = _.get(profile, 'creditScore')

    const product = await productSetting(opts.product, opts.accountType, institutionId, transacting)

    product.advancedRate = await advancedRateSetting(institutionId, product, transacting)

    if (product.advanced_rate && !opts.collateral) return Promise.reject(new BadRequestError(`CollateralRequiredForProduct[${product.id}]`))

    const collateralType = _.snakeCase(_.get(opts, 'collateral.type', product.advanced_rate))

    if (collateralType !== product.advanced_rate) return Promise.reject(new BadRequestError(`Collateral[${collateralType}] is not available for ProductAdvancedRate[${product.advanced_rate}]`))

    const [rate, injections, collateral] = await Promise.all([
      _rate(product),
      enrichAssets(institutionId, product, opts.injections, false, profile),
      enrichCollateral(institutionId, product, { ...opts.collateral, type: collateralType }, profile)
    ])

    summary.rate = { ...summary.rate, ...rate }

    if (opts.rate && opts.rate !== summary.rate.value) {
      summary.rate.reasons.push({
        metric: 'rate',
        metricId: 'product_base_rate',
        operation: 'override_product_base_rate_and_rate_consideration',
        requested: summary.rate.value,
        adjusted: opts.rate,
        adjustment: opts.rate - summary.rate.value
      })

      summary.rate = { ...summary.rate, value: opts.rate, requested: summary.rate.value }
    }

    const cost = _.get(collateral, 'summary.value', opts.amount)
    if (!cost) return Promise.reject(new BadRequestError(`RequiredAtLeastOneOf: [amount, collateral]`))

    if (collateral.summary) summary.collateral = { ...summary.collateral, ...collateral.summary, _: collateral.items }
    if (injections.summary) summary.equityDown = { ...summary.equityDown, ...injections.summary, _: injections.items }

    const equityDown = _.get(injections, 'summary.value', 0)

    const injectionsMonthlyDebt = _.get(injections, 'summary.debt.monthly', 0)
    const collateralMonthlyDebt = _.get(collateral, 'summary.debt.monthly', 0)

    const monthlyDebt = opts.monthlyDebtObligation - injectionsMonthlyDebt - collateralMonthlyDebt

    summary.monthlyDebt.value = monthlyDebt
    summary.monthlyDebt.requested = opts.monthlyDebtObligation

    if (injectionsMonthlyDebt) summary.monthlyDebt.reasons.push({
      metric: 'monthly_debt_obligation',
      metricId: 'monthlyDebtObligationInjections',
      operation: 'reduce_monthly_debt_by_injections_monthly_debt',
      requested: opts.monthlyDebtObligation,
      adjusted: monthlyDebt,
      adjustment: -(injectionsMonthlyDebt)
    })

    if (collateralMonthlyDebt) summary.monthlyDebt.reasons.push({
      metric: 'monthly_debt_obligation',
      metricId: 'monthlyDebtObligationCollateral',
      operation: 'reduce_monthly_debt_by_collateral_monthly_debt',
      requested: opts.monthlyDebtObligation,
      adjusted: monthlyDebt,
      adjustment: -(collateralMonthlyDebt)
    })

    const term = _term(opts, product.advancedRate)

    summary.totalTerm = { ...summary.totalTerm, requested: _.get(term, 'req.total'), max: _.get(term, 'max.total') }
    summary.amortTerm = { ...summary.amortTerm, requested: _.get(term, 'req.amort'), max: _.get(term, 'max.amort') }

    const loan = _loan(product, opts.targetLoanToValue, cost, equityDown, opts.cashDown)

    summary.loan = { ...summary.loan, ...loan }

    const cashDown = opts.cashDown + _.get(loan, 'cash.additional', 0)

    summary.cashDown.min = _.get(loan, 'cash.min', 0)
    summary.cashDown.value = cashDown
    summary.cashDown.requested = opts.cashDown

    if (cashDown !== opts.cashDown) summary.cashDown.reasons.push({
      metricId: 'cashDown',
      metric: 'loan_to_value',
      operation: 'additional_cash_down',
      requested: opts.cashDown,
      adjusted: cashDown
    })

    const income = await _income(opts.annualIncome, monthlyDebt, profile)

    summary.monthlyIncome = {
      ...summary.monthlyIncome,
      value: _.round(income.monthly.gross, 2),
      debtToIncome: { before: _.round(income.monthly.dti, 3) }
    }

    const risks = await app.services.risk.list(institutionId, product.id, transacting)

    const maxPayment = await _maxPayment(institutionId, summary, risks)

    if (opts.targetPayment) {
      summary.payment.requested = opts.targetPayment
      if (opts.targetPayment > maxPayment) {
        summary.payment.requested = maxPayment
        summary.payment.reasons.push({
          metricId: 'targetPayment',
          metric: 'payment',
          operation: 'lower_target_payment_to_max_payment_allowable_by_dti',
          requested: opts.targetPayment,
          adjusted: summary.payment.requested
        })
      }
    }

    const amortize = _amort(summary, risks)

    summary.monthlyDebt.after = monthlyDebt + amortize.payment
    summary.monthlyIncome.debtToIncome.after = _.round(summary.monthlyDebt.after / summary.monthlyIncome.value, 3)

    summary.cashDown.max = summary.collateral.value - summary.equityDown.value

    const riskAnalysis = await _riskAnalysis(institutionId, summary, _.omit(risks, '_'))

    summary = mappers.omitByDeep(summary, val => _.isNil(val) || (_.isObject(val) && _.isEmpty(val)))

    return { amortize, summary, riskAnalysis }
  } catch(err) {
    return Promise.reject(err)
  }
}
// Temp comment

async function _maxPayment(institutionId, summary, risks) {
  const dtiRisk = risks[DEBT_TO_INCOME_INDICATOR]

  if (!dtiRisk) return Promise.reject(new BadRequestError('Debt to Income: Risk Analyzer Required'))

  const maxPayment = await dtiRisk.calculator({ ...summary }).then(dti => dti.maxDebt.additional)

  summary.payment = { ...summary.payment, max: maxPayment }

  return maxPayment
}

async function _riskAnalysis(institutionId, summary, risks) {
  const scores = { sum: 0, weight: 0 }
  const disqualifiers = []
  const nonPerformers = []

  let analyses = await Promise.all(_.map(risks, async risk => {
    if (!risk.calculator) return risk
    return risk.calculator({ ...summary }).then(computed => {
      let weight = numbers.toNumber(risk.weight || 1)
      weight = Math.abs(_.isFinite(weight) ? weight : 1)

      scores.weight += weight
      if (computed.performing) {
        // if performing, there should be a quantum score leap to ensure the penalization of non-performers, set that leap to 25% of the weight
        const scale = .25 + ((computed.relativePerformance || 1) * .75)
        scores.sum += scale * weight
      }

      const _risk = _.omit(risk, ['calculator'])
      if (computed.disqualifying) disqualifiers.push({ risk: _risk, ...computed, threshold: risk.disqualifying_metric })
      if (!computed.performing) nonPerformers.push({ risk: _risk, ...computed, threshold: risk.performance_standard })
      return _.omitBy({ risk: _risk, disqualifying: computed.disqualifying, performing: computed.performing, ...computed, _: _.omitBy(risk, _.isNil) }, _.isNil)
    }).catch(err => logger.error(err))
  })).then(calcs => _.reduce(calcs, (_risks, risk) => {
    if (risk && risk._ && risk._.indicator) _risks[risk._.indicator] = risk
    return _risks
  }, {}))

  const disqualifying = !_.isEmpty(disqualifiers)
  const performing = _.isEmpty(nonPerformers)
  const _score = (scores.sum / (scores.weight || 1)) * 100
  const score = _.round(_score, 2)
  const risk = _.round((100 - _score) / 10, 1)

  const agg = { disqualifying, performing, score, risk, analyses }

  if (disqualifying) agg.disqualifiers = disqualifiers
  if (!performing) agg.nonPerformers = nonPerformers

  return agg
