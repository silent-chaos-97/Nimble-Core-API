exports.up = function (knex) {
  const sql = `
// Temp comment
    ALTER TABLE signers RENAME COLUMN front_drivers_license_uri TO front_id_proof_document_uri;
