const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
  table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
  table.uuid('applicant_id').references('users.id')
