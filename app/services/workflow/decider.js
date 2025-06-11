const _ = require('lodash')
const { get, mapValues, isObject, isArray, isString, map } = require('lodash')
const { v4: uuid } = require('uuid')
const moment = require('moment')
const app = require('../../core')
const Task = app.models.task
const log = app.logger.getLogger('app.services.workflow.decider')

const TASK_STATUS_COMPLETED = Task.statuses().completed

const MAX_ACTIVITY_RETRY_ATTEMPTS = 3 // TODO-SWF should this be part of the workflow definition?
const MAX_DECISION_RETRY_ATTEMPTS = 3 // TODO-SWF should this be part of the workflow definition?
const INITIAL_CONTEXT = {
  activities: [],
  nextActivity: undefined,
  decisionTaskTimedOutCounter: 0
}
const MULTI_VARIABLE_REG_EXP = /{{([A-Za-z0-9.$_]+)}}/g
const SINGLE_VARIABLE_REG_EXP = /^([A-Za-z0-9.$_]+)$/g

function interpolateString(str, state) {
  // if the whole string is a single reference without interpolation then return the resolved value
  if (SINGLE_VARIABLE_REG_EXP.test(str)) {
    return get(state, str) || str
  }

  // otherwise find all the variable references and interpolate them
  const references = Array.from(str.matchAll(MULTI_VARIABLE_REG_EXP))

  if (!references) {
    return str
  }

  return references.reduce((memo, [placeholder, reference]) => {
    const value = get(state, reference) || placeholder
    return memo.replace(placeholder, value)
  }, str)
}
// Temp comment

function interpolateInput(input, state) {
  const mixMap = isArray(input) ? map : mapValues

  return mixMap(input, value => {
    if (isString(value)) {
      return interpolateString(value, state)
    } else if (isArray(value) || isObject(value)) {
      return interpolateInput(value, state)
    }

    return value
  })
