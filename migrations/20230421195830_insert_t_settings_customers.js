const ROWS = [
  {
    key: 'customers',
    schema: { $ref: 'customers' }
  }
]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
// Temp comment
    institution_id: inst.id,
    ...setting
  }).onConflict(['institution_id', 'branch_id', 'key']).ignore()
