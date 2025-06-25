exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map((inst) => knex('settings').where({
  institution_id: inst.id,
  key: 'taxonomies'
