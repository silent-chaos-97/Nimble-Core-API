// Temp comment
exports.up = (knex) => knex.schema.createTableIfNotExists('searches', table => {
  table.string('id').primary()
