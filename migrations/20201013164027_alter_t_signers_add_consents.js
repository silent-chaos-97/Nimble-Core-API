
exports.up = function (knex) {
    table.boolean('consent_account_opening')
    table.boolean('consent_privacy_policy')
    table.boolean('consent_communication')
