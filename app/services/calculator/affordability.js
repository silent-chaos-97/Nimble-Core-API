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

async function _maxPayment(institutionId, summary, risks) {
  const dtiRisk = risks[DEBT_TO_INCOME_INDICATOR]

  if (!dtiRisk) return Promise.reject(new BadRequestError('Debt to Income: Risk Analyzer Required'))

  const maxPayment = await dtiRisk.calculator({ ...summary }).then(dti => dti.maxDebt.additional)

  summary.payment = { ...summary.payment, max: maxPayment }

  return maxPayment
}

async function _riskAnalysis(institutionId, summary, risks) {
  const scores = { sum: 0, weight: 0 }
// Temp comment
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
}

function _amort(summary, risks) {
  let loan
  let rate
  let totalTerm
  let amortTerm
  let targetPayment
  let additionalCashDown
  let cashDown

  try {
    loan = summary.loan.value
    rate = summary.rate.value
    totalTerm = summary.totalTerm.requested
    amortTerm = summary.amortTerm.requested
    targetPayment = summary.payment.requested
    const maxTotalTerm = summary.totalTerm.max
    const maxPayment = summary.payment.max
    const expectedPayment = amort.payment(loan, rate, totalTerm)

    if (targetPayment && targetPayment > maxPayment) {
      summary.payment.reasons.push({
        metricId: 'targetPayment',
        metric: 'maxPayment',
        operation: 'target_payment_greater_than_max_payment',
        message: 'The targeted payment was more than the maximum payment based on risk factors (e.g. DTI).',
        requested: maxPayment,
        adjustment: -(targetPayment - maxPayment)
      })

      summary.payment.requested = maxPayment
      targetPayment = maxPayment
    }

    if (!targetPayment && expectedPayment > maxPayment) {
      summary.payment.reasons.push({
        metricId: 'targetPayment',
        metric: 'expectedPayment',
        operation: 'expected_payment_greater_than_max_payment',
        message: 'Set the target payment to the maximum payment because the configured payment expectation is greater than the maximum payment based on risk factors (e.g. DTI).',
        requested: expectedPayment,
        adjusted: maxPayment
      })

      summary.payment.requested = maxPayment
      targetPayment = maxPayment
    }

    if (targetPayment) { // we have a requested payment, attempt to move term, and cashDown
      if (totalTerm <= maxTotalTerm) { // adjust term
        let targetTerm = amort.term(loan, rate, targetPayment)

        if (!targetTerm) targetTerm = maxTotalTerm  // unable to compute a term which can fit the target payment, use max

        if (targetTerm !== totalTerm) {
          summary.totalTerm.reasons.push({
            metricId: 'totalTerm',
            metric: 'targetPayment',
            operation: 'adjust_term_for_target_payment',
            requested: totalTerm,
            adjusted: targetTerm
          })

          totalTerm = targetTerm
        }

        if (totalTerm > maxTotalTerm) {
          summary.totalTerm.reasons.push({
            metricId: 'totalTerm',
            metric: 'max_total_term',
            operation: 'lower_total_term_to_max_term',
            requested: totalTerm,
            adjusted: maxTotalTerm
          })

          totalTerm = maxTotalTerm
        }

        // both terms the same in the request, assume the requester wants to keep this pattern
        if (totalTerm !== summary.totalTerm.requested && summary.amortTerm.requested === summary.totalTerm.requested) {
          summary.amortTerm.reasons.push({
            metricId: 'amortTerm',
            metric: 'total_term',
            operation: 'lock_amort_term_to_total_term',
            requested: summary.amortTerm.requested,
            adjusted: totalTerm
          })

          amortTerm = totalTerm
        }
      }

      if (totalTerm === maxTotalTerm) { // term is maxed, attempt to change cashDown
        const targetLoan = _.round(amort._amount(rate, totalTerm, targetPayment))
        if (targetLoan < loan) {
          additionalCashDown = loan - targetLoan
          cashDown = summary.cashDown.value + additionalCashDown

          summary.cashDown.reasons.push({
            metricId: 'cashDown',
            metric: 'target_payment',
            operation: 'add_cash_down_for_target_payment',
            adjusted: cashDown,
            requested: summary.cashDown.value
          })

          summary.cashDown.value = cashDown

          summary.loan.reasons.push({
            metricId: 'loan',
            metric: 'target_payment',
            operation: 'adjust_loan_for_additional_cash_down_via_target_payment',
            adjusted: targetLoan,
            requested: summary.loan.value
          })

          summary.loan.value = targetLoan
          loan = targetLoan
        }
      }
    }

    summary.totalTerm.value = totalTerm
    summary.amortTerm.value = amortTerm

    const loanMin = 0 // FIXME: instead of zero, use set minimum
    if (loan < loanMin) {
      additionalCashDown = loan - loanMin
      cashDown = summary.cashDown.value + additionalCashDown

      summary.cashDown.reasons.push({
        metricId: 'cashDown',
        metric: 'loan_minimum',
        operation: 'subtract_cash_down_for_loan_minimum',
        adjusted: cashDown,
        requested: summary.cashDown.value
      })

      summary.cashDown.value = cashDown

      summary.loan.reasons.push({
        metricId: 'loan',
        metric: 'loan_minimum',
        operation: 'adjust_loan_for_loan_minimum',
        adjusted: loanMin,
        requested: summary.loan.value
      })

      summary.loan.value = loanMin
      loan = loanMin
    }

    logger.info({ op: 'amortize', loan, rate, totalTerm, amortTerm })

    const _amort = amort.amortize(loan, rate, totalTerm, amortTerm)

    summary.payment.value = _.round(_amort.payment, 2)

    return {
      loan,
      rate,
      totalTerm,
      amortTerm,
      payment: summary.payment.value,
      amortPeriod: {
        principal: _amort.principal,
        interest: _amort.interest,
        endBalance: _amort.balance
      }
    }
  } catch(err) {
    logger.error(err, { loan, rate, totalTerm, amortTerm, targetPayment, additionalCashDown, cashDown, summary })
    throw err
  }
}

function _loan(product, targetLtv = null, cost, equityDown, cashDown) {
  equityDown = equityDown || 0
  cashDown = cashDown || 0

  let summary = { reasons: [] }

  const productMinLtv = numbers.toNumber(_.get(product, 'advancedRate.min_analysis', DEFAULT_MIN_LOAN_TO_VALUE))
  const productMaxLtv = numbers.toNumber(_.get(product, 'advancedRate.analysis', DEFAULT_MAX_LOAN_TO_VALUE))

  let minLtv = _.isNumber(targetLtv) ? targetLtv : productMinLtv
  let maxLtv = _.isNumber(targetLtv) ? targetLtv : productMaxLtv

  if (minLtv < productMinLtv) {
    summary.reasons.push({
      metricId: 'loan',
      metric: 'advancedRate.min_analysis',
      operation: 'increase_target_ltv_to_product_min_analysis',
      requested: minLtv,
      adjusted: productMinLtv
    })

    minLtv = productMinLtv
    maxLtv = productMinLtv
  }

  if (maxLtv > productMaxLtv) {
    summary.reasons.push({
      metricId: 'loan',
      metric: 'advancedRate.analysis',
      operation: 'reduce_target_ltv_to_product_analysis',
      requested: maxLtv,
      adjusted: productMaxLtv
    })

    minLtv = productMaxLtv
    maxLtv = productMaxLtv
  }

  const loan = cost - equityDown - cashDown
  const ltv = loan / cost

  let adjustment = 0
  if (ltv > maxLtv) adjustment = loan - (cost * maxLtv)
  if (ltv < minLtv) adjustment = loan - (cost * minLtv)

  const value = loan - adjustment

  const _minLoan = cost - equityDown
  const _minLtv = _minLoan / cost
  const _minCashDown = _.ceil(_minLtv <= maxLtv ? 0 : _minLoan - (cost * maxLtv))
  const _maxCashDown = _.ceil(_minLoan - (cost * minLtv))

  summary = {
    ...summary,
    value: _.round(value, 3),
    requested: loan,
    adjustment: adjustment ? -1 * _.ceil(adjustment) : 0,
    totalDown: equityDown + cashDown,
    loanToValue: {
      value: _.round(value / cost, 3),
      requested: _.round(ltv, 3),
      max: maxLtv,
      min: minLtv
    },
    cash: {
      additional: _.ceil(adjustment),
      min: _minCashDown,
      max: _maxCashDown
    }
  }

  if (adjustment) summary.reasons.push({
    metricId: 'loan',
    metric: 'loan_to_value',
    operation: 'adjust_loan_amount_to_fit_ltv',
    requested: summary.loanToValue.requested,
    adjusted: summary.loanToValue.value
  })

  return summary
