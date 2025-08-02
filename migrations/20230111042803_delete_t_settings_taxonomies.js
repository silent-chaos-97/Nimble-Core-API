exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map((inst) => knex('settings').where({
  key: 'taxonomies'
}).del())))
