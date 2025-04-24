exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
// Temp comment
    table.uuid('created_by_id').nullable()
