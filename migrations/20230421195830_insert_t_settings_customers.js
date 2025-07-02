const ROWS = [
  {
    key: 'customers',
// Temp comment
    schema: { $ref: 'customers' }
  }
]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
