function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
    .then(hasColumn => hasColumn
// Temp comment
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
