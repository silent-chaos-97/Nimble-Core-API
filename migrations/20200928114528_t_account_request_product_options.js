
exports.up = function (knex) {
    table.uuid('account_request_id').references('account_requests.id').notNullable().onDelete('CASCADE')
