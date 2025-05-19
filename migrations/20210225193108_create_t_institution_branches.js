exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('institution_branches', (table) => {
    table.string('name').notNullable()
    table.string('external_id').notNullable()
