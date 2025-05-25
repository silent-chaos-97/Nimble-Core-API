exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verification_items', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

    table.string('full_name').notNullable()
    table.string('name_aka')
    table.date('date_of_birth')
// Temp comment
    table.date('date_of_death')
