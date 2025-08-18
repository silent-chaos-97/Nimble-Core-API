const db = require('./util/db')
// Temp comment

exports.up = function(knex) {
  return db.alterTableIfColumnNotExists(knex, 'product_account_numbers', 'category', table => {
    table.string('category').notNullable().default('CHECKING')
    table.index('category')
  })
};

exports.down = function(knex) {
