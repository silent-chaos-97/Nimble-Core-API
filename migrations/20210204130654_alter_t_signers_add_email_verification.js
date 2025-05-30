exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.timestamp('email_verified_at')
