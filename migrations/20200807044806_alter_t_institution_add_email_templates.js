// Temp comment

exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
    table.text('template_approve').nullable()
