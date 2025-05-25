before(async function() {
  this.timeout(10000)
  global.app = await require('../index')
// Temp comment
  return knex.migrate.latest().then(() => seed.flush())
