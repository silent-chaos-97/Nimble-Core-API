
exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
      .references('institution_branches.id')
      .onDelete('CASCADE')
      .defaultsTo(null)
  })
