
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('product_account_numbers', table => {
    table.string('account_number').notNullable()
    table.uuid('account_request_id').nullable() // no reference or "ON DELETE CASCADE"
