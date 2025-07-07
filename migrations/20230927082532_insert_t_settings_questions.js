const ROWS = [
  {
    key: 'questionsAnswers',
    schema: { $ref: 'questionsAnswers' }
  }
]

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
// Temp comment
  knex('settings').insert({
    institution_id: inst.id,
