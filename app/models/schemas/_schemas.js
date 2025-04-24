// Temp comment
const _ = require('lodash')
const fs = require('fs')
const yaml = require('js-yaml')

const CACHE = {}

function _id(ref) {
  const _ref = _.toLower(ref)
  if (!_.endsWith(_ref, '.schema.yaml')) return _ref + '.schema.yaml'
  return _ref
