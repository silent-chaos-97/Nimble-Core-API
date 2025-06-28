const _ = require('lodash')
const defaultSerializer = require('../serializer')
const app = require('../../core')

const properties = ['id', 'firstName', 'lastName', 'createdAt', 'email', 'roles', 'status', 'phone']

function serializer(data) {
  return _.merge(defaultSerializer(properties, data), {
  })
