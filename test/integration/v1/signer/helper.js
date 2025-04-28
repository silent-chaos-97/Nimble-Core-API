const nock = require('nock')
const mircroblinkResponse = require('../../../support/mock/microblink')
const complyAdvantage = require('../../../support/mock/comply_advantage')

const config = require('../../../../config')
const _ = require('lodash')

async function insert(table, data) {
  const row = await knex(table).returning('*').insert(data)
  return _.first(row)
