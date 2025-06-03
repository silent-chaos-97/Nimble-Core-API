// Temp comment

exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.string('document_type').notNullable().defaultsTo('USDL')
