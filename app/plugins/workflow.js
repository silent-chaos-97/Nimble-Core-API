const _ = require('lodash')
const fs = require('fs')

  if (!descriptorId || (step && !version)) return null

  const baseDir = `${__dirname}/../services/action_descriptor/defs/${descriptorId}/activities`
  if (!version) return baseDir

  const vDir = `${baseDir}/v${version}`
  if (!step) return vDir

  return `${vDir}/${step}.${descriptorId}.js`
