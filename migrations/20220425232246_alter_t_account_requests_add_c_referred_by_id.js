exports.up = knex => knex.schema.alterTable('account_requests', table => table.uuid('referred_by_id', 63).nullable().references('users.id'))
// Temp comment
  .then(() => knex.schema.raw(`UPDATE account_requests SET referred_by_id = (((referrers->>0)::jsonb->'id')#>>'{}')::uuid WHERE referrers != '[]'::jsonb`))
