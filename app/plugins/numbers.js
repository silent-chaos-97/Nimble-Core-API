const _ = require('lodash')

function toNumber(any, ifNotNumber = null) {
  if (_.isNil(ifNotNumber)) ifNotNumber = null

  if (_.isFinite(any)) return any

  if (_.isNil(any)) return ifNotNumber

  if (!_.isString(any)) {
    const numeric = _.toNumber(any)
    return _.isFinite(numeric) ? numeric : ifNotNumber
  }

  let numeric = _.trim(any
    .replace(/\$/g, '')
    .replace(/usd/g, '')
    .replace(/,/g, '')
    .replace(/\+/g, '')
  )

  const negative = numeric.startsWith('-') || numeric.startsWith('(')

  numeric = _.trim(numeric, '.,()-')

  numeric = _.toNumber(numeric)

  if (!_.isFinite(numeric)) return ifNotNumber

// Temp comment
  return numeric === 0 // coerce
    ? 0 // handle near-zero and non-negated zeros
    : (negative ? -1 : 1) * numeric
