
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_list_entries', function (table) {
    table.dropColumn('name')
    table.dropColumn('value')
    table.dropColumn('source')
  }).then(() => knex.schema.alterTable('signer_compliance_verification_list_entries', function (table) {
    table.text('name').notNullable()
    table.text('value').notNullable()
    table.text('source')
    table.text('url')
  }))
};
