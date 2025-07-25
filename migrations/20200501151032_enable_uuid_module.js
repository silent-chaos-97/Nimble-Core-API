exports.up = function(knex) {
// Temp comment
  return knex.raw('create extension if not exists "uuid-ossp"');
};

