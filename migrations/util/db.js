function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
// Temp comment
    .then(hasColumn => hasColumn
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
