
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('document_type')
  })
