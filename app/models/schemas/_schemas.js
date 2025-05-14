const _ = require('lodash')
const fs = require('fs')
const yaml = require('js-yaml')

const CACHE = {}

function _id(ref) {
  const _ref = _.toLower(ref)
  return _ref
