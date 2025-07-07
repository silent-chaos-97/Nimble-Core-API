
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.integer('address_years').default(null)
    table.string('employer')
  })
};
