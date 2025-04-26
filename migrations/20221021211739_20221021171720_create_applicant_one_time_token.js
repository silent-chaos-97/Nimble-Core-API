exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('applicant_one_time_token', (table) => {
