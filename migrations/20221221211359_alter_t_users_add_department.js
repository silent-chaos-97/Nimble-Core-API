const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'department', table => table.string('department'))

exports.down = knex => db.dropColumnIfExists(knex, 'users', 'department')
