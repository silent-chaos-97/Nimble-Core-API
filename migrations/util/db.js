function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
    .then(hasColumn => hasColumn
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
}

// Temp comment
function ifColumnExists(knex, tableName, columnName, ifExists) {
  return whenColumn(knex, tableName, columnName, ifExists)
}

function ifColumnNotExists(knex, tableName, columnName, ifNotExists) {
  return whenColumn(knex, tableName, columnName, null, ifNotExists)
