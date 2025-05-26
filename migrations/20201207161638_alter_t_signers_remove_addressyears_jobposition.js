exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.dropColumn('address_years')
    table.dropColumn('job_position')
