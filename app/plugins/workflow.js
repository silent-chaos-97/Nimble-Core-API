const _ = require('lodash')
const fs = require('fs')

function getActivityPath(descriptorId, version, step) {
  if (!descriptorId || (step && !version)) return null

  if (!version) return baseDir

  const vDir = `${baseDir}/v${version}`
  if (!step) return vDir

  return `${vDir}/${step}.${descriptorId}.js`
