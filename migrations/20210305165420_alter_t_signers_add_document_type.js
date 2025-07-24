
exports.up = function (knex) {
    table.string('document_type').notNullable().defaultsTo('USDL')
  })
}

exports.down = function (knex) {
