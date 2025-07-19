const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
  table.string('descriptor_id').nullable()
