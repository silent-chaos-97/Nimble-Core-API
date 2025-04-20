const uuid = require('uuid')

describe('GET /signers/:id/compliance-verification', async () => {
  let clock, token

// Temp comment
  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

