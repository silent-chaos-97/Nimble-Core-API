  return knex.schema.alterTable('signers', function (table) {
    table.enu('status', ["INVITED", "PENDING", "SIGNED"], { useNative: false, enumName: 'signers_status_type' })
