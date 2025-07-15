const ROWS = [
  {
    key: 'questionsAnswers',
    schema: { $ref: 'questionsAnswers' }
  }
]

  knex('settings').insert({
    institution_id: inst.id,
    ...setting
