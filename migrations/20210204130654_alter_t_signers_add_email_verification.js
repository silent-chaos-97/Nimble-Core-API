exports.up = function (knex) {
    table.boolean('email_verified').default(false)
    table.timestamp('email_verified_at')
