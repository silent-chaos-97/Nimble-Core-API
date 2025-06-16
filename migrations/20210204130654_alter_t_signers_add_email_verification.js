exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.boolean('email_verified').default(false)
    table.timestamp('email_verified_at')
  })
