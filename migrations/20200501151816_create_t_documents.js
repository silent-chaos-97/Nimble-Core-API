  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
