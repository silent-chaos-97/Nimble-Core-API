const formatAlterTableEnumSql = (
  tableName,
  columnName,
  enums,
  oldConstraintName
) => {
  const constraintName = `${tableName}_${columnName}_check`;
  return [
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${oldConstraintName};`,
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${constraintName};`,
      "'::text, '"
    )}'::text]));`,
  ].join('\n');
