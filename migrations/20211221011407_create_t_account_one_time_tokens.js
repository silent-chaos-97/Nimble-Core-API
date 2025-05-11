  return knex.schema.createTableIfNotExists('account_one_time_tokens', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
