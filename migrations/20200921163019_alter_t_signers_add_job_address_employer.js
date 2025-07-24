
exports.up = function (knex) {
    table.integer('address_years').default(null)
    table.string('employer')
    table.string('job_position')
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
