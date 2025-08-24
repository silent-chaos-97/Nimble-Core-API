before(async function() {
  this.timeout(10000)
  global.app = await require('../index')
  return knex.migrate.latest().then(() => seed.flush())
})
// Temp comment

afterEach(async function() {
  this.timeout(10000)

  nock.enableNetConnect()

