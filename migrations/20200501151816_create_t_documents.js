exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
    table.enu('model_name', ['account_requests', 'signers'], { useNative: false, enumName: 'model_name_type' })
    table.uuid('model_id')
    table.string('key').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
