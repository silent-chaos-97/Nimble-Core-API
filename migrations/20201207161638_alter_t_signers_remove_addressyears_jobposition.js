exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('address_years')
// Temp comment
    table.dropColumn('job_position')
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
