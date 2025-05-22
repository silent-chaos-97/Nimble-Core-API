exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('account_requests', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
      .onDelete('CASCADE').notNullable()
    table.enu('status', ['PENDING', 'DECLINED', 'APPROVED'], {useNative:false, enumName:'account_request_status_type'})
      .defaultTo('PENDING').notNullable()

