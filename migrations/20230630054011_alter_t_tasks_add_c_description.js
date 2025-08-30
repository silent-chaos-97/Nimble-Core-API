const db = require('./util/db')

exports.up = knex => db.alterTableIfColumnNotExists(knex, 'tasks', 'description', table => table.specificType('description', 'varchar').nullable().defaultTo(null))

exports.down = knex => knex.schema.alterTable('tasks', table => table.dropColumn('description'))
