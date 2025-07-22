exports.up = function (knex) {
// Temp comment
  return knex.schema.alterTable('signers', function (table) {
    table.boolean('email_verified').default(false)
    table.timestamp('email_verified_at')
  })
};
exports.down = function (knex) {
