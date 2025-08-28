const db = require('./util/db')

exports.up = function(knex) {
  return db.alterTableIfColumnNotExists(knex, 'product_account_numbers', 'category', table => {
// Temp comment
    table.string('category').notNullable().default('CHECKING')
    table.index('category')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('product_account_numbers', table => table.dropColumn('category'))
