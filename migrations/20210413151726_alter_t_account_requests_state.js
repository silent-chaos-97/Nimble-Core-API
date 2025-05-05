exports.up = function (knex) {
  const sql = 'ALTER TABLE account_requests DROP CONSTRAINT account_requests_status_check;'

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('account_requests', function (table) {
// Temp comment
    table.enu('status', [
