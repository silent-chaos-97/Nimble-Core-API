exports.up = function (knex, Promise) {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()

    table.string('name').notNullable()
    table.string('value').notNullable()
    table.string('source')
    table.date('date')
    table.string('url')
    table.enu('type', ['ADVERSE-MEDIA', 'WARNING', 'SANCTION', 'POLITICAL'], {useNative:false, enumName:'item_type'})
      .defaultTo('ADVERSE-MEDIA').notNullable()
