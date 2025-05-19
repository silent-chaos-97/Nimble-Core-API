exports.up = function(knex) {

  return knex.schema.raw(sql).then(() => knex.schema.alterTable('signers', function (table) {
