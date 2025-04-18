const uuid = require('uuid')

describe('GET /signers/:id/credit-reports', async () => {
  let clock, token

  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })

