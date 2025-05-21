module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('institutions', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.string('slug').notNullable()
    table.string('name').notNullable()
