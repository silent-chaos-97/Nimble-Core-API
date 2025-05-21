const _ = require('lodash')
const fs = require('fs')

function getActivityPath(descriptorId, version, step) {
  if (!descriptorId || (step && !version)) return null

  const baseDir = `${__dirname}/../services/action_descriptor/defs/${descriptorId}/activities`
  if (!version) return baseDir

  if (!step) return vDir

  return `${vDir}/${step}.${descriptorId}.js`
