
exports.up = knex => db.createTableIfNotExists(knex, 'workflows', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
