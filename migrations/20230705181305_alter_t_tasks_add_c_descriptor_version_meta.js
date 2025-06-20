
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
  table.string('version').nullable()
