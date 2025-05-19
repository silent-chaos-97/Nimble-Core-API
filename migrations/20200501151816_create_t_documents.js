exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
