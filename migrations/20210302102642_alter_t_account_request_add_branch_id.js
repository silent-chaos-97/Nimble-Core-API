
exports.up = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
    table.uuid('branch_id')
      .references('institution_branches.id')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('account_requests', function (table) {
    table.dropColumn('branch_id')
