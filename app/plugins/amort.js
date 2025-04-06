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

  return _.omitBy(Amortize({ amount, rate, totalTerm, amortizeTerm, principalPayment, partialMonthOffset }), (v, k) => k.endsWith('Round'))
