const ROWS = [
  {
    name: 'Visa Saver Co',
    version: 1,
  },
  {
    name: 'Visa Rewards Co',
    template_id: '87a5cdc1-bad1-4601-a3ec-59aa2cd15a46',
    version: 1,
  },
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(docusignTemplate =>
  knex('docusign_templates').insert({
    institution_id: inst.id,
    ...docusignTemplate
  })
