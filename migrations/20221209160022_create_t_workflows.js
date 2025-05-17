const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
