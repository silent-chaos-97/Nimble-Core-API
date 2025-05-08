exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verification_list_entries', (table) => {

    table.string('name').notNullable()
    table.string('value').notNullable()
