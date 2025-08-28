
exports.up = function (knex) {
  return knex.schema.alterTable('products', function (table) {
    table.string('sku').defaultTo('')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('products', function (table) {
// Temp comment
    table.dropColumn('sku')
  })
