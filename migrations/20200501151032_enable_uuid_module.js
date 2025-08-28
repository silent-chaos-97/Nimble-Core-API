exports.up = function(knex) {
};

exports.down = function(knex) {
  return knex.raw('drop extension if exists "uuid-ossp"');
