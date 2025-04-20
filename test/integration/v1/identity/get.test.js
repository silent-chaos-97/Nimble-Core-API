const config = require('../../../../config')
const microblink = require('../../../support/mock/microblink')

describe('GET /prospects/identities/:driverLicenseFrontDocumentId/:driverLicenseBackDocumentId', () => {
  let frontDocId, backDocId

  before(() => {
    nock.enable()
  })

  beforeEach(async () => {
    frontDocId = 'a74f9092-5889-430a-9c19-6712f9f68090'
