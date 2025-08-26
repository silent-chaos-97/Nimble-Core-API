const ROWS = [
  {
    schema: { $ref: 'external_professionals' }
  }
]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
    ...setting
  }).onConflict(['institution_id', 'branch_id', 'key']).ignore()
)))))

exports.down = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting => knex('settings').where({
  institution_id: inst.id,
