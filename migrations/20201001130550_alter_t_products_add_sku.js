
exports.up = function (knex) {
    table.string('sku').defaultTo('')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('products', function (table) {
