
exports.up = function (knex) {
    table.dropColumn('answer')
  }).then(() => knex.schema.alterTable('bsa_risk_results', function (table) {
    table.string('answer')
  }))
}

exports.down = function (knex) {
