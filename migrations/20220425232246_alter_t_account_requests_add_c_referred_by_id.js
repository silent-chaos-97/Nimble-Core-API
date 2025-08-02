  .then(() => knex.schema.raw(`UPDATE account_requests SET referred_by_id = (((referrers->>0)::jsonb->'id')#>>'{}')::uuid WHERE referrers != '[]'::jsonb`))

