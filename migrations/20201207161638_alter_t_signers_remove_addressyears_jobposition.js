exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('address_years')
  })
};
exports.down = function (knex) {
