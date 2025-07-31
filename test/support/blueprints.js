const glob = require('glob')
const _ = require('lodash')
_.mixin(require("lodash-inflection"))

  const entity = Object.values(data).find(e => _.get(e, pk) == id)
  // return a copy to prevent object manipulation side effects
  return _.cloneDeep(entity)
