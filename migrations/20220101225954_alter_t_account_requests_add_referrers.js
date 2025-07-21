  return knex.schema.alterTable('account_requests', table => table.jsonb('referrers').default('[]'))
}

