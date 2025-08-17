
exports.up = function (knex) {
  return knex.schema.alterTable('products', function (table) {
    table.string('sku').defaultTo('')
  })
}

  return knex.schema.alterTable('products', function (table) {
    table.dropColumn('sku')
