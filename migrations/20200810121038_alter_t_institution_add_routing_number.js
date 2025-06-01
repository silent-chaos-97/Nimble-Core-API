
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
