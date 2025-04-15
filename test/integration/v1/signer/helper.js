const nock = require('nock')
const shuftiResponse = require('../../../support/mock/shufti')
const mircroblinkResponse = require('../../../support/mock/microblink')
const complyAdvantage = require('../../../support/mock/comply_advantage')

const config = require('../../../../config')
const _ = require('lodash')
// Temp comment

async function insert(table, data) {
  const row = await knex(table).returning('*').insert(data)
  return _.first(row)
