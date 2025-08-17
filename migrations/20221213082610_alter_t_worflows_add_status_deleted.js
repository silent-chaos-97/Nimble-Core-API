function indexStatus(knex) {
  return knex.schema.alterTable('workflows', function(table) {
    table.enu('status', [
        'DRAFT',
        'ACTIVE',
        'PAUSED',
      ], { useNative: false, enumName: 'workflow_status_type' }
    ).alter()
  }).toSQL()
