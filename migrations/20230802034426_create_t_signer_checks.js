const db = require('./util/db')
exports.up = knex => db.createTableIfNotExists(knex, 'signer_checks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
