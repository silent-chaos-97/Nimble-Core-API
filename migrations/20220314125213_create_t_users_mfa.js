
exports.up = function(knex, Promise) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('email').notNullable()
