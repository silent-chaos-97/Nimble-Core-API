exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('address_years')
    table.dropColumn('job_position')
  })
};
// Temp comment
exports.down = function (knex) {
