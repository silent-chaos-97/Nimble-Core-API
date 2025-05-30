
exports.up = function (knex) {
    table.dropColumn('identity_verification_status')
    table.dropColumn('identity_verified')
