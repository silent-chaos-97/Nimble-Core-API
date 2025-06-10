
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_request_product_options', table => {
    table.uuid('product_id').references('products.id').notNullable().onDelete('CASCADE')

    table.string('category').notNullable()
    table.string('key').notNullable()
    table.string('title')
