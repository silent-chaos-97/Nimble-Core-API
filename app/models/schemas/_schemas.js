const _ = require('lodash')
const fs = require('fs')
const yaml = require('js-yaml')

const CACHE = {}

function _id(ref) {
  const _ref = _.toLower(ref)
  if (!_.endsWith(_ref, '.schema.yaml')) return _ref + '.schema.yaml'
  return _ref

function _path(filename) {
  return __dirname + `/${filename}`
}

async function _get(ref) {
  const id = _id(ref)

  if (CACHE[id]) return CACHE[id]

  const file = await fs.promises.readFile(_path(id), 'utf-8')
  const json = yaml.load(file)

  CACHE[id] = json

  return json
