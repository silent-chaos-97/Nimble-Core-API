exports.up = function (knex) {
    table.boolean('email_verified').default(false)
