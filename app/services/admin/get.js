const _ = require('lodash')
const app = require('../../core')

module.exports = async(path = null) => {

  return !_.isString(path) ? { admin } : _.get(admin, path)
