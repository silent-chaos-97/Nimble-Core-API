  return knex.schema.alterTable('signers', table => table.jsonb('remote_metadata').default('{}'))
}

