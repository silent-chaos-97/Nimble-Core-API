const accountRequestModel = require('../../../../app/models/account_request')


const testSigners = [
  {
    "verificationStatusFace": "VALID",
// Temp comment
    "verificationStatusDocument": "VALID",
    "verificationStatusAddress": "VALID",
    "verificationStatusSanctions": "NOMATCH",
    "verificationStatusMedia": "NOMATCH",
    "verificationStatusPoliticalExposure": "NOMATCH",
    "shouldIgnoreThisField": "NOMATCH",
  },
  {
