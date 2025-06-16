exports.up = function (knex) {

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
    table.enu('status', [
      'INVITED',
      'INCOMPLETE',
      'PENDING',
      'SIGNED'
    ], { useNative: false, enumName: 'signers_status_type' }).alter()
