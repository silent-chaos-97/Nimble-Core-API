/**
 * @param { import("knex").Knex } knex
 */
exports.up = knex => Promise.all([
  knex('products').where({ sku: '' }).del()
])

