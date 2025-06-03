const db = require('./util/db')

exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('user_id').references('users.id').notNullable().onDelete('CASCADE')
    table.uuid('institution_id').references('institutions.id').notNullable().onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
