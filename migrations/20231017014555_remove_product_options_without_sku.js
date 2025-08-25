/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => Promise.all([
  knex('products').where({ sku: '' }).del()
])

/**
 * @returns { Promise<void> }
