const glob = require('glob')
const _ = require('lodash')
_.mixin(require("lodash-inflection"))

function getEntity(data, pk, id) {
  // return a copy to prevent object manipulation side effects
  return _.cloneDeep(entity)
