
exports.up = function (knex) {
    table.dropColumn('identity_verification_status')
    table.dropColumn('identity_verified')
    table.dropColumn('identity_verification_result')
  })
};
exports.down = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
