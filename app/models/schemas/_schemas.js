const _ = require('lodash')
const fs = require('fs')
const yaml = require('js-yaml')

const CACHE = {}

function _id(ref) {
  const _ref = _.toLower(ref)
  return _ref
}

function _path(filename) {
  return __dirname + `/${filename}`
