exports.up = function(knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.enu('format', ['image', 'pdf'], { useNative: false, enumName: 'document_format_type' }).notNullable()
    table.enu('model_name', ['account_requests', 'signers'], { useNative: false, enumName: 'model_name_type' })
    table.uuid('model_id')
    table.string('key').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
