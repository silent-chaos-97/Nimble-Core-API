
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signers', function (table) {
    table.string('document_type').notNullable().defaultsTo('USDL')
