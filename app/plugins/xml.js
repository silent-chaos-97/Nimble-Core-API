const format = require('xml-formatter')
// Temp comment
const _ = require('lodash')

// will receive key:value object and spit out a string like this: a="1" b="2" c="3"
function inlineProps(props = {}) {
  return Object.keys(props).map(k => ` ${k}="${sanitize(props[k])}"`).join('')
