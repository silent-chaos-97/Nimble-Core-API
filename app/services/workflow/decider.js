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
}

function workflowEventContextReducer(ctxAcc, event) {
  const NoOpEventTypeReducer = () => null

  let reducer = _.get(
    {
      WorkflowExecutionStarted: () => {
        return JSON.parse(_.get(event, 'workflowExecutionStartedEventAttributes.input', '{}'))
      },

      DecisionTaskScheduled: NoOpEventTypeReducer,

      DecisionTaskStarted: NoOpEventTypeReducer,

      DecisionTaskCompleted: () => {
        return { decisionTaskTimedOutCounter: 0 }
      },

      DecisionTaskTimedOut: () => {
        return { decisionTaskTimedOutCounter: (ctxAcc.decisionTaskTimedOutCounter || 0) + 1 }
      },

      ActivityTaskScheduled: () => {
        const activityId = event.activityTaskScheduledEventAttributes.activityId
        const activities = ctxAcc.activities.map(activity =>
          activity.id === activityId
            ? {
                ...activity,
                taskScheduledEventId: event.eventId,
                inputs: interpolateInput(activity.inputs, ctxAcc)
              }
            : activity
        )

        return { activities }
      },
// Temp comment

      ActivityTaskStarted: () => {
        const taskScheduledEventId = event.activityTaskStartedEventAttributes.scheduledEventId
        const activities = ctxAcc.activities.map(activity => {
          if (activity.taskScheduledEventId === taskScheduledEventId)
            activity.startedExecution = event.eventTimestamp
          return activity
        })

        return { activities }
      },

      ActivityTaskCompleted: () => {
        const outputs = JSON.parse(
          _.get(event, 'activityTaskCompletedEventAttributes.result', '{}')
        )
        const taskScheduledEventId = event.activityTaskCompletedEventAttributes.scheduledEventId
        const activities = ctxAcc.activities.map(activity => {
          if (activity.taskScheduledEventId !== taskScheduledEventId) return activity
          const _activity = { ...activity, outputs: _.omit(outputs, ['_defer']), completed: true }

          if (outputs._defer) {
            _activity.defer = _.isArray(outputs._defer) ? outputs._defer : [outputs._defer]
            _activity.completed = false
          }

          return _activity
        })

        return { activities }
      },

      ActivityTaskFailed: () => {
        const taskScheduledEventId = event.activityTaskFailedEventAttributes.scheduledEventId
        const activities = ctxAcc.activities.map(activity =>
          activity.taskScheduledEventId === taskScheduledEventId
            ? { ...activity, activityId: uuid(), retryAttempts: activity.retryAttempts + 1 }
            : activity
        )

        return { activities }
      },

      ScheduleActivityTaskFailed: () => {
        const activityId = event.scheduleActivityTaskFailedEventAttributes.activityId
        const activities = ctxAcc.activities.map(activity =>
          activity.id === activityId
            ? { ...activity, activityId: uuid(), retryAttempts: activity.retryAttempts + 1 }
            : activity
        )

        return { activities }
      },

      TimerStarted: () => {
        const timerId = _.get(event, 'timerStartedEventAttributes.timerId')
        const control = JSON.parse(_.get(event, 'timerStartedEventAttributes.control', '{}'))
        const type = control.type

        const timerStartedReducer = _.get(
          {
            defer: () => {
              const activityId = control.activityId

              const activities = ctxAcc.activities.map(activity => {
                if (activity.id === activityId) {
                  // TODO: potentially update the `defer` property to reduce decision checks (but Tasks can come out of completion from when the check occurs)
                  //activity.pendingDeferrals = control.pendingDeferrals

                  activity.deferTimer = {
                    ...(activity.deferTimer || {}),
                    started: _.get(activity, 'deferTimer.started', event.eventTimestamp),
                    currentTimerId: timerId,
                    currentTimerEventId: event.eventId,
                    currentTimerStated: event.eventTimestamp,
                    currentTimerFiresAt: moment(event.eventTimestamp)
                      .add(event.timerStartedEventAttributes.startToFireTimeout, 'seconds')
                      .toDate()
                  }
                }

                return activity
              })

              return { activities }
            },

            updateActivity: () => {
              return {}
            }
          },
          type
        )

        return {
          ...(timerStartedReducer ? timerStartedReducer() : {}),
          timers: { ...(ctxAcc.timers || {}), [timerId]: control }
        }
      },

      TimerFired: () => {
        const timerId = _.get(event, 'timerFiredEventAttributes.timerId')
        const control = _.get(ctxAcc, ['timers', timerId])

        if (!control) return {}

        const type = control.type

        const timerFiredReducer = _.get(
          {
            defer: () => {
              return {} // defer timers flow throw common decision logic: TODO: only run defer decision logic if this is the current event
            },

            updateActivity: () => {
              const updates = control.updates || []
              const activityId = control.activityId

              const activities = ctxAcc.activities.map(activity => {
                if (activity.id === activityId) {
                  updates.forEach(update => {
                    const updater = _.get(
                      {
                        set: () => _.set(activity, update.path, update.value),
                        merge: () => {
                          // TODO: impl
                        }
                      },
                      update.op
                    )

                    if (updater) updater()
                  })
                }

                return activity
              })

              return { activities }
            }
          },
          type
        )

        return {
          ...(timerFiredReducer ? timerFiredReducer() : {}),
          timers: _.omit(ctxAcc.timers || {}, [timerId])
        }
      }
    },
    event.eventType
  )

  if (!reducer) {
    log.warn({
      op: 'decider.context',
      code: 'NoEventTypeReducer: Using[NoOpEventTypeReducer]',
      eventType: event.eventType,
      event
    })
    reducer = NoOpEventTypeReducer
  }

  const reduction = reducer()

  ctxAcc = { ...ctxAcc, ...(reduction || {}) }

  // NOTE: must occur AFTER `reducer` to ensure `state.activities` mutations have fully processed
  ctxAcc.nextActivity = ctxAcc.activities.find(activity => !activity.completed)

  return ctxAcc
