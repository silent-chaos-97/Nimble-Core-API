
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
    table.string('name').notNullable()
    table.string('template_id').notNullable()
    table.integer('version').defaultsTo(0)

