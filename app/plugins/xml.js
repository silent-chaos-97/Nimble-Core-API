const format = require('xml-formatter')
const _ = require('lodash')

// Temp comment
// will receive key:value object and spit out a string like this: a="1" b="2" c="3"
function inlineProps(props = {}) {
  return Object.keys(props).map(k => ` ${k}="${sanitize(props[k])}"`).join('')
