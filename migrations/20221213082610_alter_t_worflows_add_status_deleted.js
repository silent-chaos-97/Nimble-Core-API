function indexStatus(knex) {
    table.enu('status', [
        'DRAFT',
        'ACTIVE',
        'PAUSED',
        'DELETED'
      ], { useNative: false, enumName: 'workflow_status_type' }
    ).alter()
  }).toSQL()
