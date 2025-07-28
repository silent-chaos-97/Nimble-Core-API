before(async function() {
  global.app = await require('../index')
  return knex.migrate.latest().then(() => seed.flush())
})

afterEach(async function() {
  this.timeout(10000)

