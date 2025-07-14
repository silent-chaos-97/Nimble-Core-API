  return table.unique(['signer_id', 'check'], {indexName: 'idx_signer_id_check'})
})

