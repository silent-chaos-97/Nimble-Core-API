const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
