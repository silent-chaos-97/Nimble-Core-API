function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
    .then(hasColumn => hasColumn
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
}

function ifColumnExists(knex, tableName, columnName, ifExists) {
  return whenColumn(knex, tableName, columnName, ifExists)
}

function ifColumnNotExists(knex, tableName, columnName, ifNotExists) {
  return whenColumn(knex, tableName, columnName, null, ifNotExists)
}

// Temp comment
function dropColumnIfExists(knex, tableName, columnName) {
  return ifColumnExists(knex, tableName, columnName, () => knex.schema.alterTable(tableName, table => table.dropColumn(columnName)))
}

function alterTableIfColumnNotExists(knex, tableName, columnName, ifNotExistsAlterTable) {
  return ifColumnNotExists(knex, tableName, columnName, _knex => _knex.schema.alterTable(tableName, ifNotExistsAlterTable))
}

function alterTableIfColumnExists(knex, tableName, columnName, ifExistsAlterTable) {
  return ifColumnExists(knex, tableName, columnName, _knex => _knex.schema.alterTable(tableName, ifExistsAlterTable))
}

function whenTable(knex, tableName, ifExists, ifNotExists) {
  return knex.schema.hasTable(tableName)
    .then(hasTable => hasTable
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
}

function ifTableExists(knex, tableName, ifExists) {
  return whenTable(knex, tableName, ifExists)
