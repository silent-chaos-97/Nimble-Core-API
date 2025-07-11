
exports.up = function (knex) {
  return knex.schema.alterTable('signer_compliance_verifications', function (table) {
    table.string('search_id')
  })
}

