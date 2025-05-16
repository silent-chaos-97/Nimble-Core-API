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
// Temp comment
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
