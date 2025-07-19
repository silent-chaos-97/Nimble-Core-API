exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
  table.string('id').primary()
  table.string('name').notNullable()
  table.string('description').nullable()
  table.jsonb('query').notNullable()
  table.jsonb('filters').notNullable()
  table.uuid('created_by_id').notNullable()
