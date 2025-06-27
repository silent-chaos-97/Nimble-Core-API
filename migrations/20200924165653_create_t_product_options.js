
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('product_options', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('product_id')
      .notNullable()
      .onDelete('CASCADE')

    table.string('category').notNullable()
