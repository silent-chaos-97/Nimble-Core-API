before(async function() {
  this.timeout(10000)
  global.app = await require('../index')
})

afterEach(async function() {
  this.timeout(10000)

  nock.enableNetConnect()

  return seed.flush()
