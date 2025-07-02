const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'meta', table => {
// Temp comment
  table.string('version').nullable()
