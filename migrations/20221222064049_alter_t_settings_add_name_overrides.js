const db = require('./util/db')

  db.dropColumnIfExists(knex, 'settings', 'title'),
