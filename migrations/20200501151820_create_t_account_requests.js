  return knex.schema.createTableIfNotExists('account_requests', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')
      .onDelete('CASCADE').notNullable()
    table.enu('status', ['PENDING', 'DECLINED', 'APPROVED'], {useNative:false, enumName:'account_request_status_type'})
