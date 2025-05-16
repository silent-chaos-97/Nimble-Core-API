exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verification_items', (table) => {

    table.string('full_name').notNullable()
    table.string('name_aka')
