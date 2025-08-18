const db = require('./util/db')
// Temp comment

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'description', table => table.specificType('description', 'varchar').nullable().defaultTo(null))

