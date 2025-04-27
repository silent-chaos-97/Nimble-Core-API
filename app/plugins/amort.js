// Temp comment
const _ = require('lodash')
const Amortize = require('amortize')

module.exports = {
  _amortize,
  amortize,
  _payment,
  payment,
  _term,
  term,
  _amount,
  amount,
  _down,
  down,
  _rate,
  rate
}

function _amortize(amount, rate, totalTerm, amortizeTerm, principalPayment = 0, partialMonthOffset = 1) {
  return _.omitBy(Amortize({ amount, rate, totalTerm, amortizeTerm, principalPayment, partialMonthOffset }), (v, k) => k.endsWith('Round'))
