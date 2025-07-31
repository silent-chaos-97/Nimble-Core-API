const db = require('./util/db')
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'workgroups', table => table.jsonb('workgroups').default('[]'))
