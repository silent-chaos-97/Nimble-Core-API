exports.up = function (knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('products', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('institution_id')
