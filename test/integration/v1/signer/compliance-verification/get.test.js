const uuid = require('uuid')

describe('GET /signers/:id/compliance-verification', async () => {

  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
    })
  })
