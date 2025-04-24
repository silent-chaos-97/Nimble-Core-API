const uuid = require('uuid')
const mock = require('../../../support/mock/shufti')
const sinon = require('sinon')

describe('POST /v1/webhooks/shufti/identity-verification', async () => {
  let clock, createSpy

  before(async () => {
    createSpy = sinon.spy(app.services.identityVerification, 'create')
      toFake: ['Date']
    })
  })

  after(() => {
    sinon.restore()
    clock.restore()
