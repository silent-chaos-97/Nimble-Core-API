
exports.up = function(knex, Promise) {
  const updateRAWSQL = "UPDATE signers SET document_issued_state='IA' where document_issued_state IS NULL;"


  return knex.schema.alterTable('signers', function (table) {
  }).then(() => knex.raw(updateRAWSQL))
