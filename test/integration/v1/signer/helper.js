const nock = require('nock')
const shuftiResponse = require('../../../support/mock/shufti')
const mircroblinkResponse = require('../../../support/mock/microblink')
const complyAdvantage = require('../../../support/mock/comply_advantage')

const config = require('../../../../config')
const _ = require('lodash')

async function insert(table, data) {
  const row = await knex(table).returning('*').insert(data)
  return _.first(row)
}

async function post(endpoint, obj) {
  return request(app.server)
    .post(endpoint)
    .send(obj)
    .expect('Content-Type', /json/)
}

async function get(endpoint) {
    .get(endpoint)
    .expect('Content-Type', /json/)
