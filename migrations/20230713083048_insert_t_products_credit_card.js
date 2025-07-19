const ROWS = [
  {
    name: 'Credit Card',
    sku: 'credit-card',
    category: 'CARD',
    summary: 'A credit card is a type of credit facility, provided by banks that allow customers to borrow funds within a pre-approved credit limit. It enables customers to make purchase transactions on goods and services.',
    content: 'A credit card is a type of credit facility, provided by banks that allow customers to borrow funds within a pre-approved credit limit. It enables customers to make purchase transactions on goods and services.'
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
