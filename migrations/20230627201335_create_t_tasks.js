const db = require('./util/db')
exports.up = knex => db.createTableIfNotExists(knex, 'tasks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
