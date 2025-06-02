module.exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.uuid('institution_id').references('institutions.id')
      .notNullable().onDelete('CASCADE')
    table.string('email').notNullable()
