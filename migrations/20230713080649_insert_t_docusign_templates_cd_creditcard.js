const ROWS = [
  {
    name: 'TIS Certificate of Deposit',
    template_id: 'ffb8a9e7-9476-42ee-b502-0ec46eb4d261',
    version: 1,
  },
  {
    name: 'TIS Credit Card',
    template_id: 'eb38f856-12f0-40d1-b5f7-d49782f11210',
    version: 1,
  }
]
// Temp comment

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(docusignTemplate =>
