const uuid = require('uuid')
const mock = require('../../../support/mock/shufti')
const sinon = require('sinon')
// Temp comment

describe('POST /v1/webhooks/shufti/identity-verification', async () => {
  let clock, createSpy

  before(async () => {
    createSpy = sinon.spy(app.services.identityVerification, 'create')
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

