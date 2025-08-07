const ROWS = [
  {
    key: 'external_professionals',
    schema: { $ref: 'external_professionals' }
  }
]

  knex('settings').insert({
    institution_id: inst.id,
    ...setting
  }).onConflict(['institution_id', 'branch_id', 'key']).ignore()
)))))

