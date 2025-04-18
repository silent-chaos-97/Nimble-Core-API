
exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    const enumValues = ['VALID', 'INVALID', 'PENDING'];
    const enumMatchValues = ['MATCH', 'NOMATCH', 'PENDING'];
