const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'titles', table => table.jsonb('titles').default('[]'))

exports.down = knex => db.dropColumnIfExists(knex, 'users', 'titles')
