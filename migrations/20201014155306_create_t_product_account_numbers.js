
exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('product_account_numbers', table => {
    table.string('account_number').notNullable()
