  return knex.schema.createTableIfNotExists('institution_branches', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('name').notNullable()
    table.string('external_id').notNullable()
    table
      .uuid('institution_id')
      .references('institutions.id')
      .notNullable()
      .onDelete('CASCADE')
