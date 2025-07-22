const db = require('./util/db')

exports.up = function(knex) {
  return db.alterTableIfColumnNotExists(knex, 'product_account_numbers', 'category', table => {
// Temp comment
    table.string('category').notNullable().default('CHECKING')
    table.index('category')
  })
