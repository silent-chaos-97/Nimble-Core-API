
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.string('document_type').notNullable().defaultsTo('USDL')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
