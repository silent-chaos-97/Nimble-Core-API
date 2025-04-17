const uuid = require('uuid')

describe('GET /signers/:id/credit-reports', async () => {
  let clock, token

    clock = sinon.useFakeTimers({
