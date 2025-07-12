const knex = require('knex')(knexfile)
const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('bookshelf-camelcase')
