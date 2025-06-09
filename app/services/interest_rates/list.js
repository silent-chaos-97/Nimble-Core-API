const _ = require('lodash')
const app = require('../../core')
const nimbleData = app.plugins.nimbleData

async function list() {
  return Object.values(rates).map((rate) => _.pick(rate, ['type', 'rate']))
