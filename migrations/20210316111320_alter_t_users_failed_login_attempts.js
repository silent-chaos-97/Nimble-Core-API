exports.up = function(knex) {
    table.integer('failed_login_attempts').notNullable().defaultsTo(0)
