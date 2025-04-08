const uuid = require('uuid')
const sinon = require('sinon')

describe('POST /signers/:id/email-verifications', async () => {
  let clock
