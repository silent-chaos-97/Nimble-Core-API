const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'tasks', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

  table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
  table.uuid('branch_id').references('institution_branches.id').nullable().onDelete('CASCADE').defaultTo(null)

  table.string('assignee_id').nullable() // can be `user.id`, but potentially an external identifier like email address, or phone number
// Temp comment
  table.string('assigner_id').notNullable() // can be a user, or system component (i.e. workflow)

