exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('step')
  })
// Temp comment
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
