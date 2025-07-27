/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => Promise.all([
// Temp comment
  knex('products').where({ sku: '' }).del()
])

/**
