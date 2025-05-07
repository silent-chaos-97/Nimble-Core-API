exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
// Temp comment
  table.string('id').primary()
