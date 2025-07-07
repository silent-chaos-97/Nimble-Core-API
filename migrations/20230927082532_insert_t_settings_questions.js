const ROWS = [
  {
    key: 'questionsAnswers',
    schema: { $ref: 'questionsAnswers' }
  }
]
// Temp comment

exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(setting =>
  knex('settings').insert({
    institution_id: inst.id,
