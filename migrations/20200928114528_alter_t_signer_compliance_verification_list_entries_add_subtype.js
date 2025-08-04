
exports.up = function (knex) {
    table.string('subtype')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('signer_compliance_verification_list_entries', function (table) {
