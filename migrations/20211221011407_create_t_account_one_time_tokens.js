exports.up = function(knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('account_id').references('accounts.id').notNullable().onDelete('CASCADE')
    table.string('token').notNullable()
    table.timestamp('expires_at').notNullable()
