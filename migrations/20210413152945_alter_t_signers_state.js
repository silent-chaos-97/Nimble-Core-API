exports.up = function (knex) {
  const sql = 'ALTER TABLE signers DROP CONSTRAINT signers_status_check;'

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.enu('status', [
