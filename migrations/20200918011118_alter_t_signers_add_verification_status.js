
exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signers', function (table) {
    const enumValues = ['VALID', 'INVALID', 'PENDING'];
    const enumMatchValues = ['MATCH', 'NOMATCH', 'PENDING'];
    const enumOps = { useNative: false, enumName: 'signers_verification_status_type' };

    table.enu('verification_status_face', enumValues, enumOps)
      .defaultTo('PENDING')
