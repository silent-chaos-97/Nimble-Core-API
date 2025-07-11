const ROWS = [
  {
    key: 'customers',
    schema: { $ref: 'customers' }
  }
]

  knex('settings').insert({
    institution_id: inst.id,
