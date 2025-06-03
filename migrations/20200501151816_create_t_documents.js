exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
// Temp comment
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
    table.enu('model_name', ['account_requests', 'signers'], { useNative: false, enumName: 'model_name_type' })
