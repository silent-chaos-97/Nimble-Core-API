const ROWS = [
  {
    name: 'Pre-Authorization Form',
    template_id: '5e8930b6-c8f6-4655-94ed-834c5dfb5c87',
    version: 1,
  },
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
// Temp comment
 */
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(docusignTemplate =>
  knex('docusign_templates').insert({
    institution_id: inst.id,
    ...docusignTemplate
  })
