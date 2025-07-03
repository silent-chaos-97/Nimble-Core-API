exports.up = function (knex) {
    table.uuid('branch_id').notNullable().alter()
  })
