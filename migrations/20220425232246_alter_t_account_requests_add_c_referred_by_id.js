exports.up = knex => knex.schema.alterTable('account_requests', table => table.uuid('referred_by_id', 63).nullable().references('users.id'))

