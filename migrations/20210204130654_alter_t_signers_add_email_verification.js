  return knex.schema.alterTable('signers', function (table) {
    table.boolean('email_verified').default(false)
