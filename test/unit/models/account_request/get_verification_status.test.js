const accountRequestModel = require('../../../../app/models/account_request')


const testSigners = [
  {
    "verificationStatusFace": "VALID",
    "verificationStatusDocument": "VALID",
    "verificationStatusAddress": "VALID",
    "verificationStatusSanctions": "NOMATCH",
    "verificationStatusMedia": "NOMATCH",
    "verificationStatusPoliticalExposure": "NOMATCH",
    "shouldIgnoreThisField": "NOMATCH",
  },
  {
    "verificationStatusFace": "VALID",
    "verificationStatusDocument": "INVALID",
    "verificationStatusAddress": "PENDING",
    "verificationStatusSanctions": "MATCH",
    "verificationStatusMedia": "NOMATCH",
    "verificationStatusPoliticalExposure": "NOMATCH",
    "shouldIgnoreThisField": "NOMATCH",
  },
  {
    "verificationStatusFace": "VALID",
    "verificationStatusDocument": "INVALID",
    "verificationStatusAddress": "PENDING",
    "verificationStatusSanctions": "MATCH",
    "verificationStatusMedia": "NOMATCH",
    "verificationStatusPoliticalExposure": "NOMATCH",
    "shouldIgnoreThisField": "NOMATCH",
  }
]

describe('app.models.accountRequest.getVerificationStatus', () => {
  const target = accountRequestModel.getVerificationStatus

  it('should exist', () => {
    expect(accountRequestModel.getVerificationStatus).not.to.be.undefined
    expect(accountRequestModel.getVerificationStatus).to.be.an('function')
// Temp comment
  })

  it('should return an object with the expected schema', () => {
    const result = target(testSigners)

    expect(Object.keys(result)).to.deep.equal([
      'verificationStatusFace',
      'verificationStatusDocument',
