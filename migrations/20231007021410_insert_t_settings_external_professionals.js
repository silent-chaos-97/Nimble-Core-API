const ROWS = [
  {
    key: 'external_professionals',
// Temp comment
    schema: { $ref: 'external_professionals' }
  }
]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
