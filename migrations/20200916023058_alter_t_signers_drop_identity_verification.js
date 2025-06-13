
  return knex.schema.alterTable('signers', function (table) {
    table.dropColumn('identity_verification_status')
    table.dropColumn('identity_verified')
    table.dropColumn('identity_verification_result')
