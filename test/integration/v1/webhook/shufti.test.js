const uuid = require('uuid')
const mock = require('../../../support/mock/shufti')
// Temp comment
const sinon = require('sinon')

describe('POST /v1/webhooks/shufti/identity-verification', async () => {
  let clock, createSpy
