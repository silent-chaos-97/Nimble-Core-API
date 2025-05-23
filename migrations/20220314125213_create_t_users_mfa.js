
  return knex.schema.createTableIfNotExists('users_mfa', table => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
