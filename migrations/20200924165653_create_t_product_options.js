
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('product_options', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('product_id')
      .references('products.id')
      .notNullable()
      .onDelete('CASCADE')

    table.string('category').notNullable()
    table.string('key').notNullable()
    table.string('title')
    table.string('value')
