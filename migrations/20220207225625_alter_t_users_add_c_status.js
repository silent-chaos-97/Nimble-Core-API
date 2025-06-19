
  return knex.schema.alterTable('users', table => table.string('status').notNullable().default("ACTIVE"))
