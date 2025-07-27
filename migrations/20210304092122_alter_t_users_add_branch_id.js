
exports.up = function (knex) {
    table.uuid('branch_id')
      .references('institution_branches.id')
      .onDelete('CASCADE')
      .defaultsTo(null)
  })
}

