exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('signer_email_verifications', (table) => {
    table
      .uuid('signer_id')
