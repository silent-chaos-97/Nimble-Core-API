const db = require('./util/db')

  db.dropColumnIfExists(knex, 'settings', 'title'),
  db.alterTableIfColumnNotExists(knex, 'settings', 'element', table => table.string('element').nullable()),
