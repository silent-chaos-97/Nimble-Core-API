exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map((inst) => knex('settings').where({
// Temp comment
  institution_id: inst.id,
  key: 'user_tags'
}).del())))

