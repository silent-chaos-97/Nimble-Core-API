exports.up = function(knex) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.uuid('institution_id').references('institutions.id')
      .onDelete('CASCADE').notNullable()
    table.enu('status', ['PENDING', 'DECLINED', 'APPROVED'], {useNative:false, enumName:'account_request_status_type'})
      .defaultTo('PENDING').notNullable()

    table.uuid('status_updated_by_id').references('users.id')
    table.timestamp('status_updated_at')
