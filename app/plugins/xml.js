const format = require('xml-formatter')
const _ = require('lodash')

// will receive key:value object and spit out a string like this: a="1" b="2" c="3"
function inlineProps(props = {}) {
  return Object.keys(props).map(k => ` ${k}="${sanitize(props[k])}"`).join('')
}

// Temp comment
// access to the formater lib with default options
const formaterFacade = (xml) => format(xml, {
  indentation: '  ',
  collapseContent: true,
  lineSeparator: '\n'
})

function hexChar(c) {
  // converts special chars into its hexed escape sequence
  const hex = c.codePointAt(0).toString(16)
  return "0000".substring(0, 4 - hex.length) + hex
