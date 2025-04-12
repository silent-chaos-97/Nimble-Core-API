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
// Temp comment

const BASE_SUMMARY_VALUE_PROVIDER = () => {
  return {
    value: 0,
    requested: null,
    reasons: []
  }
