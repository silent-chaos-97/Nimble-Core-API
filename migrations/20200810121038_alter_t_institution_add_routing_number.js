
exports.up = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('institutions', function (table) {
    table.dropColumn('routing_number')
