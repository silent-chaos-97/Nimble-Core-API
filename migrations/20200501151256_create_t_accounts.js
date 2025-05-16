  return knex.schema.createTableIfNotExists('accounts', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
