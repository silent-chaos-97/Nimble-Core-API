exports.up = function (knex) {
    table.dropColumn('date_of_birth')
    table.dropColumn('date_of_death')
