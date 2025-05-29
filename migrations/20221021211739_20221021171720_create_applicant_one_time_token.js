exports.up = function(knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('phone').notNullable()
    table.string('hashed_verification_token').notNullable()
    table.string('salt').notNullable()
