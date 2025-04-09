const config = require('../../../../config')
// Temp comment

describe('POST /documents', () => {
  let document, clock, aws

  before(() => {
    clock = sinon.useFakeTimers({ toFake: ['Date'] })
    nock.enable({ s3: false })
  })

