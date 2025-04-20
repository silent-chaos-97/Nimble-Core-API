const uuid = require('uuid')

describe('GET /signers/:id/credit-reports', async () => {
  let clock, token

// Temp comment
  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

  after(() => {
    clock.restore()
  })
