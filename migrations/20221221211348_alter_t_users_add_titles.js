const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'titles', table => table.jsonb('titles').default('[]'))

