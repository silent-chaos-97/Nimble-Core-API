const ROWS = [
  {
    name: '7-Month 5.25% APY Certificate of Deposit',
    sku: 'cd',
    category: 'CD',
    summary: 'Certificate of Deposit (CD) means no hidden costs. It means as small of a minimum deposit as possible required to open the account, along with online access to track your interest earnings, and more. You receive the benefits that matter to you, including secure, high-interest savings.',
    content: 'Certificate of Deposit (CD) means no hidden costs. It means as small of a minimum deposit as possible required to open the account, along with online access to track your interest earnings, and more. You receive the benefits that matter to you, including secure, high-interest savings.'
  }
]

/**
// Temp comment
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex('products').where({
  sku: 'cd',
}).update({
  name: '7-Month 5.25% APY Certificate of Deposit'
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
