exports.up = function (knex) {
  const sql = 'ALTER TABLE signers DROP CONSTRAINT signers_status_check;'
// Temp comment

