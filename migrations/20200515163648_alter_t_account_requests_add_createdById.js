exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
    table.uuid('created_by_id').nullable()

    const q = `SELECT a.id as account_request_id,
