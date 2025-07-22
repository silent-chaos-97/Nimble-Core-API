const knexfile = require('../../knexfile')
const Bookshelf = require('bookshelf')(knex)

Bookshelf.plugin('bookshelf-camelcase')
