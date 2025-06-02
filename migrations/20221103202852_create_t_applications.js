const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    .onDelete('CASCADE').notNullable()
