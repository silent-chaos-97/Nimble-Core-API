exports.up = function (knex) {

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('account_requests', function (table) {
    table.enu('status', [
      'DRAFT',
      'INCOMPLETE',
