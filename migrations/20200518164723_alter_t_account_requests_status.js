const formatAlterTableEnumSql = (
  tableName,
  columnName,
  enums,
  oldConstraintName
) => {
  return [
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${oldConstraintName};`,
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraintName} CHECK (${columnName} = ANY (ARRAY['${enums.join(
      "'::text, '"
    )}'::text]));`,
  ].join('\n');
