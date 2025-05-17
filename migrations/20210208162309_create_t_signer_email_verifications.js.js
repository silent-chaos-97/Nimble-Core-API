  return knex.schema.createTableIfNotExists('signer_email_verifications', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
