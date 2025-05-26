
exports.up = function (knex) {
    table.string('lead').defaultsTo(null)
    table.string('annotation').defaultsTo(null)
    table.uuid('parent_id')
