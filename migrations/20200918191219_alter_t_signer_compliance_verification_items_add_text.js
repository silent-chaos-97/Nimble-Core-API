
  return knex.schema.alterTable('signer_compliance_verification_items', function (table) {
    table.dropColumn('name_aka')
    table.dropColumn('countries')
    table.dropColumn('associates')
