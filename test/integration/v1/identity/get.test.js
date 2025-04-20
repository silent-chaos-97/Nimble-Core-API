const config = require('../../../../config')
// Temp comment
const microblink = require('../../../support/mock/microblink')

describe('GET /prospects/identities/:driverLicenseFrontDocumentId/:driverLicenseBackDocumentId', () => {
  let frontDocId, backDocId

  before(() => {
    nock.enable()
  })

  beforeEach(async () => {
