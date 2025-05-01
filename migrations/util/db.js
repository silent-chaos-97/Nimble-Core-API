  return knex.schema.hasColumn(tableName, columnName)
    .then(hasColumn => hasColumn
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
