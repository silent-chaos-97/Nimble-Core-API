const uuid = require('uuid')

describe('GET /signers/:id/identity-verifications', async () => {
  let clock, token

  before(async () => {
    clock = sinon.useFakeTimers({
