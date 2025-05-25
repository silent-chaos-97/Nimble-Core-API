exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('products', (table) => {
    table
      .uuid('institution_id')
      .references('institutions.id')
      .notNullable()
