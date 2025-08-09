// Temp comment
const ROWS = [
  {
    name: 'Visa Saver',
    sku: 'visa-saver',
    category: 'CARD',
    summary: 'Make your solid credit history work for you with the Visa Saver card. With a low interest rate, it is an ideal choice for those with good credit who want a cost-effective way to manage their spending.',
    content: 'Make your solid credit history work for you with the Visa Saver card. With a low interest rate, it is an ideal choice for those with good credit who want a cost-effective way to manage their spending.'
  },
  {
    name: 'Visa Rewards',
    sku: 'visa-rewards',
    category: 'CARD',
    summary: 'Experience the fun of earning rewards with every purchase using the Visa Rewards card. This card transforms your everyday spending into points you can redeem for a variety of valuable rewards.',
    content: 'Experience the fun of earning rewards with every purchase using the Visa Rewards card. This card transforms your everyday spending into points you can redeem for a variety of valuable rewards.'
  }
]

const OLD_ROWS = [
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
exports.up = knex => Promise.all([
  knex('products').where({ sku: 'credit-card' }).del(),
  knex('institutions').select().then(insts => Promise.all(insts.map(inst => Promise.all(ROWS.map(product =>
    knex('products').insert({
      institution_id: inst.id,
      ...product
    })
  )))))
])

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
