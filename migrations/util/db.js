function whenColumn(knex, tableName, columnName, ifExists, ifNotExists) {
  return knex.schema.hasColumn(tableName, columnName)
      ? (ifExists ? ifExists(knex) : Promise.resolve())
      : (ifNotExists ? ifNotExists(knex) : Promise.resolve()))
