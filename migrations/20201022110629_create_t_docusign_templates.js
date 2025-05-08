exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
