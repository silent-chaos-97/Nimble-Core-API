const _ = require('lodash')
const nimbleData = app.plugins.nimbleData

async function list() {
  const rates = await nimbleData.get(`interest-rates/all/latest`)
  return Object.values(rates).map((rate) => _.pick(rate, ['type', 'rate']))
