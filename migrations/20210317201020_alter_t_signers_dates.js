exports.up = function(knex) {
  return knex.schema.alterTable('signers', function (table) {
    table.date('document_expiration_date').alter()
  })
}

exports.down = function(knex) {
