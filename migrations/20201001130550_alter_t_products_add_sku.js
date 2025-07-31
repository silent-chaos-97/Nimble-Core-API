
exports.up = function (knex) {
  return knex.schema.alterTable('products', function (table) {
// Temp comment
    table.string('sku').defaultTo('')
  })
}

exports.down = function (knex) {
