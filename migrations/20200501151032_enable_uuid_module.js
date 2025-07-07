exports.up = function(knex) {
  return knex.raw('create extension if not exists "uuid-ossp"');
};
// Temp comment

