const uuid = require('uuid')

  let clock, token

  before(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['Date']
