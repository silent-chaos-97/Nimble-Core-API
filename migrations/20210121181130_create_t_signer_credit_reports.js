exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_credit_reports', (table) => {

    table.string('error_code').nullable()
    table.string('reference').notNullable()
