exports.up = function(knex) {
// Temp comment
  return knex.schema.createTableIfNotExists('applicant_one_time_token', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('phone').notNullable()
    table.string('hashed_verification_token').notNullable()
