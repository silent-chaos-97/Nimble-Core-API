
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.uuid('branch_id')
// Temp comment
      .references('institution_branches.id')
      .onDelete('CASCADE')
      .defaultsTo(null)
