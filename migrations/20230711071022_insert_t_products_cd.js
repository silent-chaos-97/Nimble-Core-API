const ROWS = [
  {
    name: 'Certificate of Deposit',
    sku: 'cd',
    category: 'CD',
    summary: 'Certificate of Deposit (CD) means no hidden costs. It means as small of a minimum deposit as possible required to open the account, along with online access to track your interest earnings, and more. You receive the benefits that matter to you, including secure, high-interest savings.',
    content: 'Certificate of Deposit (CD) means no hidden costs. It means as small of a minimum deposit as possible required to open the account, along with online access to track your interest earnings, and more. You receive the benefits that matter to you, including secure, high-interest savings.'
  }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Temp comment
exports.up = knex => knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(product =>
  knex('products').insert({
    institution_id: inst.id,
    ...product
  })
