const uuid = require('uuid')
const mock = require('../../../support/mock/shufti')

describe('POST /v1/webhooks/shufti/identity-verification', async () => {
  let clock, createSpy

  before(async () => {
