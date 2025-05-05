const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'tasks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('branch_id').references('institution_branches.id').nullable().onDelete('CASCADE').defaultTo(null)
