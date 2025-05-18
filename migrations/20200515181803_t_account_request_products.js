exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('account_request_products', table => {
    table.uuid('account_request_id').references('account_requests.id').notNullable().onDelete('CASCADE')
    table.uuid('product_id').references('products.id').notNullable().onDelete('CASCADE')

