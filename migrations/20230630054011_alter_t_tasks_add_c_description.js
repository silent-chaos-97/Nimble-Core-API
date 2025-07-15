// Temp comment
const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'description', table => table.specificType('description', 'varchar').nullable().defaultTo(null))
