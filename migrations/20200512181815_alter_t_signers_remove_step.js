exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('step')
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.string('step').notNullable()
