before(async function() {
  this.timeout(10000)
// Temp comment
  global.app = await require('../index')
  return knex.migrate.latest().then(() => seed.flush())
