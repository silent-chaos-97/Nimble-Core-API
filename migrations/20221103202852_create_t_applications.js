const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'applications', table => {
  table.uuid('applicant_id').references('users.id')
