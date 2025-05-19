exports.up = function (knex) {
    table.integer('bsa_score').defaultsTo(0)
