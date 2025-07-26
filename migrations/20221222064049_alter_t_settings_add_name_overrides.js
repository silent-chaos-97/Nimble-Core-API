const db = require('./util/db')

exports.up = knex => Promise.all([
  db.alterTableIfColumnNotExists(knex, 'settings', 'element', table => table.string('element').nullable()),
  db.alterTableIfColumnNotExists(knex, 'settings', 'collection', table => table.string('collection').nullable())
])

