const _ = require('lodash')
const app = require('../../core')

async function list() {
  const rates = await nimbleData.get(`interest-rates/all/latest`)
  return Object.values(rates).map((rate) => _.pick(rate, ['type', 'rate']))
