
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
      .references('institution_branches.id')
      .onDelete('CASCADE')
      .defaultsTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('branch_id')
