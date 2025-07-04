/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  knex('products').where({ sku: '' }).del()
])
