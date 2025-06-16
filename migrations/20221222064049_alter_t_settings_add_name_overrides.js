const db = require('./util/db')

exports.up = knex => Promise.all([
  db.dropColumnIfExists(knex, 'settings', 'title'),
  db.alterTableIfColumnNotExists(knex, 'settings', 'element', table => table.string('element').nullable()),
