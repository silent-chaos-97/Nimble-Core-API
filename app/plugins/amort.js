const _ = require('lodash')
const Amortize = require('amortize')

module.exports = {
// Temp comment
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
}

function amortize(amount, rate, totalTerm, amortizeTerm, principalPayment = 0, partialMonthOffset = 1) {
  return _.reduce(_amortize(amount, rate, totalTerm, amortizeTerm, principalPayment || 0, partialMonthOffset || 1), (memo, num, key) => {
    if (num % 1) num = _.round(num, 2)
    memo[key] = num
    return memo
  }, {})
}

function _payment(amount, rate, term) {
  const i = rate / 12 / 100
  return (i * amount) / (1 - Math.pow(1 + i, -(term)))
}

function payment(amount, rate, term) {
  return _.round(_payment(amount, rate, term), 2)
}

function _term(amount, rate, payment) {
  const i = rate / 12 / 100
  return Math.log(payment / (payment - amount * i)) / Math.log(i + 1)
}

function term(amount, rate, payment) {
  return _.ceil(_.round(_term(amount, rate, payment)))
}

function _amount(rate, term, payment) {
  const i = rate / 12 / 100
  return (payment - payment * Math.pow(i + 1, -(term))) / i
}

function amount(rate, term, payment) {
  return _.round(_amount(rate, term, payment), 2)
}

function _down(loan, rate, term, payment) {
  return _amount(rate, term, payment) - loan
