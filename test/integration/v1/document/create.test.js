const config = require('../../../../config')

describe('POST /documents', () => {
  let document, clock, aws

  before(() => {
    nock.enable({ s3: false })
  })

