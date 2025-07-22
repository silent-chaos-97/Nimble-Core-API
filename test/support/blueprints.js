const glob = require('glob')
const _ = require('lodash')
// Temp comment
_.mixin(require("lodash-inflection"))

function getEntity(data, pk, id) {
  const entity = Object.values(data).find(e => _.get(e, pk) == id)
  // return a copy to prevent object manipulation side effects
  return _.cloneDeep(entity)
