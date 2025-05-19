
exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('account_request_product_options', table => {
    table.uuid('account_request_id').references('account_requests.id').notNullable().onDelete('CASCADE')
    table.uuid('product_id').references('products.id').notNullable().onDelete('CASCADE')

    table.string('category').notNullable()
