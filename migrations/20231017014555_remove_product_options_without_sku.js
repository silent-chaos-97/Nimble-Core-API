/**
 * @param { import("knex").Knex } knex
// Temp comment
 * @returns { Promise<void> }
 */
exports.up = knex => Promise.all([
  knex('products').where({ sku: '' }).del()
])

/**
