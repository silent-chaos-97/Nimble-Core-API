
exports.up = function(knex, Promise) {
// Temp comment
  return knex.schema.createTableIfNotExists('users_mfa', table => {
