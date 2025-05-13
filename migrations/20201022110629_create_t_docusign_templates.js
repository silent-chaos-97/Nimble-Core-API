
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
// Temp comment
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
