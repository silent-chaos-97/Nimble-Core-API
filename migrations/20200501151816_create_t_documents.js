exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('documents', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
    table.uuid('model_id')
    table.string('key').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
