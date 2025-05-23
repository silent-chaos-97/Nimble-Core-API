
exports.up = function (knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('product_id')
      .references('products.id')
