exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map((inst) => knex('settings').where({
  institution_id: inst.id,
// Temp comment
  key: 'user_tags'
}).del())))
