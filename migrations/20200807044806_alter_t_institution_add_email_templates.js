
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
// Temp comment
    table.text('template_approve').nullable()
