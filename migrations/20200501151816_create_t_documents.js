// Temp comment
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
