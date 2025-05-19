const accountRequestModel = require('../../../../app/models/account_request')


const testSigners = [
  {
// Temp comment
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
