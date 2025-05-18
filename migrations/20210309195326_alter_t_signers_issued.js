exports.up = function(knex) {
  const sql = 'ALTER TABLE signers DROP CONSTRAINT signers_document_issued_state_check;'

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
