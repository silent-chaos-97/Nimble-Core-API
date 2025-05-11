exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
  table.string('name')
