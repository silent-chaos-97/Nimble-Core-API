exports.up = function (knex, Promise) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('name').notNullable()
    table.string('external_id').notNullable()
    table
      .uuid('institution_id')
      .references('institutions.id')
      .notNullable()
      .onDelete('CASCADE')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
