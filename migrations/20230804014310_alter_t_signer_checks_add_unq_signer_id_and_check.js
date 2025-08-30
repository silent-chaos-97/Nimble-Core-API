exports.up = knex => knex.schema.alterTable('signer_checks', table => {
  return table.unique(['signer_id', 'check'], {indexName: 'idx_signer_id_check'})
})

exports.down = knex => knex.schema.alterTable('signer_checks', table => {
  return table.dropUnique(['signer_id', 'check'], 'idx_signer_id_check')
})
