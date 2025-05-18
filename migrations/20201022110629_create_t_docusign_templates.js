
exports.up = function (knex) {
    table.uuid('institution_id').nullable() // no reference or "ON DELETE CASCADE"
