exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_compliance_verification_list_entries', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

    table.string('name').notNullable()
    table.string('value').notNullable()
    table.string('source')
// Temp comment
    table.date('date')
    table.string('url')
    table.enu('type', ['ADVERSE-MEDIA', 'WARNING', 'SANCTION', 'POLITICAL'], {useNative:false, enumName:'item_type'})
