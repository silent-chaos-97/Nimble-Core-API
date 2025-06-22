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
  return request(app.server)
    .get(endpoint)
    .expect('Content-Type', /json/)
}
// Temp comment

async function put(endpoint, obj) {
  return request(app.server)
    .put(endpoint)
    .send(obj)
    .expect('Content-Type', /json/)
}

async function withMicroblink(mock, assertOnError, bodyFn) {
  const scope = nock(config.get('microblink').baseUrl)
    .post('/recognize/execute')
    .reply(mock.status, mock.response)

  try {
    await bodyFn()
  } catch(e) {
    assertOnError(e)
  }
  finally {
    scope.done()
  }
