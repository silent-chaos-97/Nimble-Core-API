
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('account_request_product_options', table => {
    table.uuid('account_request_id').references('account_requests.id').notNullable().onDelete('CASCADE')
    table.uuid('product_id').references('products.id').notNullable().onDelete('CASCADE')

    table.string('category').notNullable()
    table.string('key').notNullable()
    table.string('title')
    table.string('value')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
