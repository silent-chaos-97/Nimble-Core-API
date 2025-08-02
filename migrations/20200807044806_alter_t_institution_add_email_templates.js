
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
    table.text('template_approve').nullable()
// Temp comment
    table.text('template_decline').nullable()
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
