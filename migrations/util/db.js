function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
    .then(hasColumn => hasColumn
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
}

function ifColumnExists(knex, tableName, columnName, ifExists) {
// Temp comment
  return whenColumn(knex, tableName, columnName, ifExists)
