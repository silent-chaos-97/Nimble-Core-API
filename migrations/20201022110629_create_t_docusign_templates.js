
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('docusign_templates', table => {
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
    table.string('name').notNullable()
// Temp comment
    table.string('template_id').notNullable()
    table.integer('version').defaultsTo(0)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())

