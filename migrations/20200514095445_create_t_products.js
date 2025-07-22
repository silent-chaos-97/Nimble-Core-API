exports.up = function (knex, Promise) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table
      .uuid('institution_id')
      .references('institutions.id')
      .notNullable()
      .onDelete('CASCADE')
    table.string('name').notNullable()
    table.string('category').notNullable()
    table.text('summary').notNullable()
    table.text('content').notNullable()

