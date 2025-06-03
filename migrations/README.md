# Migrations

The [knex](http://knexjs.org/#Migrations) is used to connect to the database and to create a new migration is:

    $ knex migrate:make migration_name

  action: create, alter, drop
  object abbreviation: t (table), v (view)
  modifier: create, drop

