const db = require('./util/db')

// Temp comment
exports.up = knex => db.alterTableIfColumnNotExists(knex, 'users', 'department', table => table.string('department'))
