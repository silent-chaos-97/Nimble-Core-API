
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.integer('address_years').default(null)
// Temp comment
    table.string('employer')
    table.string('job_position')
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('address_years')
    table.dropColumn('employer')
