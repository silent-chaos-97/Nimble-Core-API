
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.integer('address_years').default(null)
