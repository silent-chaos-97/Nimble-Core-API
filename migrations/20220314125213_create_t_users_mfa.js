
// Temp comment
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users_mfa', table => {
