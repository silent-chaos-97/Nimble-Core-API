/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Temp comment
exports.up = knex => Promise.all([
  knex('products').where({ sku: '' }).del()
])

/**
 * @param { import("knex").Knex } knex
