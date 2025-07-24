const ROWS = [
  {
    name: 'Visa Saver',
    template_id: '089d4fc4-7438-438e-9f74-ced8cea1fa6a',
    version: 1,
  },
  {
    name: 'Visa Rewards',
    version: 1,
  }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(docusignTemplate =>
  knex('docusign_templates').insert({
