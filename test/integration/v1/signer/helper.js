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
    scope.done()
  }
}

/*
* mock:
*  oauth
*  documentTabs
*  createEnvelope
* */
async function withDocusign(mockResponse, bodyFn) {
  nock(`https://${config.get('docusign').oauthPath}`)
    .post('/oauth/token')
    .reply(200, mockResponse.oauth)

  nock(config.get('docusign').basePath)
  .get(`/v2.1/accounts/${config.get('docusign').accountID}/templates/NONE/documents/1/tabs`)
  .reply(200, mockResponse.documentTabs)

  nock(config.get('docusign').basePath)
  .post(`/v2.1/accounts/${config.get('docusign').accountID}/envelopes`)
  .reply(200, mockResponse.createEnvelope)

  try {
    await bodyFn()
  }finally {
    nock.cleanAll()
  }
}

async function withInvalidDocusign(bodyFn) {
  nock(`https://${config.get('docusign').oauthPath}`)
    .post('/oauth/token')
    .reply(401, {error: 'Invalid'})

  try {
    await bodyFn()
  }finally {
    nock.cleanAll()
  }
