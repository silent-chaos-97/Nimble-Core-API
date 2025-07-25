const ROWS = [
  {
    name: 'Visa Saver Co',
    template_id: 'b5ddd97c-cca3-430e-9dd5-c9864cf21c8e',
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
  knex('docusign_templates').insert({
