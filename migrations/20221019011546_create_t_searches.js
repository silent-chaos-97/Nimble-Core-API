exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
  table.uuid('institution_id').notNullable()
