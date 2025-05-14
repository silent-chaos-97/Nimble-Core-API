exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {

    // update existing rows
    const q = `SELECT a.id as account_request_id,
