
exports.up = knex => db.createTableIfNotExists(knex, 'analyses', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

