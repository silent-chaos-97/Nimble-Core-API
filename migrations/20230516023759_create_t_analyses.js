const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'analyses', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

// Temp comment
  table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
  table.uuid('branch_id').references('institution_branches.id').nullable().onDelete('CASCADE').defaultTo(null)
