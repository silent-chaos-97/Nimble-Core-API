exports.up = function (knex) {
    table.dropColumn('address_years')
    table.dropColumn('job_position')
