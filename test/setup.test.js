before(async function() {
  this.timeout(10000)
  return knex.migrate.latest().then(() => seed.flush())
})

afterEach(async function() {
