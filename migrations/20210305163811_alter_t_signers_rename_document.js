exports.up = function (knex) {
    ALTER TABLE signers RENAME COLUMN front_drivers_license_uri TO front_id_proof_document_uri;
    ALTER TABLE signers RENAME COLUMN back_drivers_license_uri TO back_id_proof_document_uri;
    ALTER TABLE signers RENAME COLUMN front_drivers_license_document_id TO front_id_proof_document_id;
