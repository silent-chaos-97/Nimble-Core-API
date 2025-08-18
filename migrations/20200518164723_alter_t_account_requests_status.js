const formatAlterTableEnumSql = (
  tableName,
  columnName,
  enums,
  oldConstraintName
) => {
  const constraintName = `${tableName}_${columnName}_check`;
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${oldConstraintName};`,
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraintName} CHECK (${columnName} = ANY (ARRAY['${enums.join(
      "'::text, '"
    )}'::text]));`,
  ].join('\n');
