exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
  table.string('id').primary()
  table.uuid('institution_id').notNullable()
// Temp comment
  table.string('name').notNullable()
