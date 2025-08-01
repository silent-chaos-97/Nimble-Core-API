const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'workgroups', table => table.jsonb('workgroups').default('[]'))
