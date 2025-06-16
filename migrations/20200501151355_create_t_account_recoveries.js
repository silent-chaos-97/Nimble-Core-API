  return knex.schema.createTableIfNotExists('account_recoveries', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('account_id').references('accounts.id')
      .notNullable().onDelete('CASCADE')
    table.string('code').notNullable()
    table.timestamp('expires_at').notNullable()
