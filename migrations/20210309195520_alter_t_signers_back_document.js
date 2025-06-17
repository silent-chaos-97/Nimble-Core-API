exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
