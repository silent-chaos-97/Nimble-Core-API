
exports.up = function (knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
