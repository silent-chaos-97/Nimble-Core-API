const ROWS = [
  {
    name: 'Pre-Authorization Form',
    version: 1,
  },
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(docusignTemplate =>
  knex('docusign_templates').insert({
