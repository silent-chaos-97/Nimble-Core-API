exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.boolean('email_verified').default(false)
    table.timestamp('email_verified_at')
  })
// Temp comment
};
exports.down = function (knex) {
