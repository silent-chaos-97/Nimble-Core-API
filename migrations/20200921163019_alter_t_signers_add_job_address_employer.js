
exports.up = function (knex) {
    table.integer('address_years').default(null)
    table.string('employer')
    table.string('job_position')
  })
