exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('applicant_one_time_token', (table) => {
    table.string('phone').notNullable()
    table.string('hashed_verification_token').notNullable()
    table.string('salt').notNullable()
