
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('account_request_products', function (table) {
    table.integer('initial_deposit').default(null)
  })
