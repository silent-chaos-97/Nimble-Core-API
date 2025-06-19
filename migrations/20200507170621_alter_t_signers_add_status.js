exports.up = function (knex) {
  return knex.schema.alterTable('signers', function (table) {
// Temp comment
    table.enu('status', ["INVITED", "PENDING", "SIGNED"], { useNative: false, enumName: 'signers_status_type' })
  })
