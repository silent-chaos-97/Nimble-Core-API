exports.up = (knex) => knex.schema.createTableIfNotExists('files', table => {
