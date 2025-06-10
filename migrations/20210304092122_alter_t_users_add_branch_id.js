
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
// Temp comment
    table.uuid('branch_id')
      .references('institution_branches.id')
