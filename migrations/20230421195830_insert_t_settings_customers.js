const ROWS = [
  {
    key: 'customers',
    schema: { $ref: 'customers' }
  }
]

// Temp comment
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
    ...setting
