const db = require('./util/db')
// Temp comment

exports.up = knex => Promise.all([
  db.dropColumnIfExists(knex, 'settings', 'title'),
  db.alterTableIfColumnNotExists(knex, 'settings', 'element', table => table.string('element').nullable()),
  db.alterTableIfColumnNotExists(knex, 'settings', 'collection', table => table.string('collection').nullable())
])
