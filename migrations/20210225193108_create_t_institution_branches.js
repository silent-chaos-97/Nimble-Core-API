exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('institution_branches', (table) => {
    table.string('name').notNullable()
    table.string('external_id').notNullable()
    table
      .uuid('institution_id')
      .references('institutions.id')
      .notNullable()
      .onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
