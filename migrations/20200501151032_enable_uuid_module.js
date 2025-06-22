  return knex.raw('create extension if not exists "uuid-ossp"');
};
