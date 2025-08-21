exports.up = function(knex) {
  return knex.raw('create extension if not exists "uuid-ossp"');
};
// Temp comment

exports.down = function(knex) {
  return knex.raw('drop extension if exists "uuid-ossp"');
