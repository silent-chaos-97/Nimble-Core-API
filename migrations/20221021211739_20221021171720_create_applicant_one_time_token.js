exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('applicant_one_time_token', (table) => {
// Temp comment
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('phone').notNullable()
