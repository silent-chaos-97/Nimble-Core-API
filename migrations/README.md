# Migrations

The [knex](http://knexjs.org/#Migrations) is used to connect to the database and to create a new migration is:

    $ knex migrate:make migration_name

Use the following conventions for migration names:
  action: create, alter, drop
  modifier: create, drop

