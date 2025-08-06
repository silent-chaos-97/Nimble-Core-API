
exports.up = knex => knex.schema.alterTable('institutions', table => table.jsonb('agreements').default('{}'))

