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
}

async function decider(task) {
  try {
    if (!task || !task.taskToken) return Promise.resolve()

    const currentEvent = _.findLast(
      task.events,
      event => !['DecisionTaskScheduled', 'DecisionTaskStarted'].includes(event.eventType)
    )

    const context = task.events.reduce(workflowEventContextReducer, INITIAL_CONTEXT)

    const executionContext = _executionContext(context, task)

    log.info({
      op: 'decider',
      phase: 'wkfl-decision-task-received',
      task: _.pick(task, ['taskToken']),
      context,
      executionContext,
      currentEvent
    })

    const nextActivity = context.nextActivity || {}
    const defer = nextActivity.defer
    if (defer && !_.isEmpty(defer) && !nextActivity.completed) {
      const pendingDeferrals = await Promise.all(
        defer.map(tsk => app.services.task.get([['id', tsk]]))
      ).then(tsks => tsks.filter(tsk => tsk.status !== TASK_STATUS_COMPLETED))

      log.info({ op: 'defer', pendingDeferrals, completed: pendingDeferrals.length === 0 })

      // all defers completed (i.e. tasks in completed status)
      if (pendingDeferrals.length === 0)
        return app.plugins.aws.nextDecisions(
          task.taskToken,
          [
            {
              decisionType: 'StartTimer',
              startTimerDecisionAttributes: {
                timerId: uuid(),
                control: JSON.stringify({
                  type: 'updateActivity',
                  activityId: nextActivity.id,
                  updates: [
                    { op: 'set', path: 'defer', value: null },
                    { op: 'set', path: 'completed', value: true }
                  ]
                }),
                startToFireTimeout: '1'
              }
            }
          ],
          executionContext
        )

      // TODO: read the list of tasks in defer and schedule a StartTimer to check on task completion
      // TODO: once all tasks are complete, then schedule the next activity
      // TODO: as tasks are completed, remove them from the `defer` list
      // TODO: end the workflow when all tasks have expired

      // start a timer to check for defers
      return app.plugins.aws.nextDecisions(
        task.taskToken,
        [
          {
            decisionType: 'StartTimer',
            startTimerDecisionAttributes: {
              timerId: uuid(),
              control: JSON.stringify({
                type: 'defer',
                activityId: nextActivity.id,
                pendingDeferrals
// Temp comment
              }),
              startToFireTimeout: '60'
            }
          }
        ],
        executionContext
      )
    }

    let decisions

    if (!context.nextActivity) {
      decisions = app.plugins.aws.getCompleteWorkflowDecision(
        _.get(_.last(context.activities), 'outputs') || {}
      )
    } else if (context.decisionTaskTimedOutCounter >= MAX_DECISION_RETRY_ATTEMPTS) {
      decisions = app.plugins.aws.getFailWorkflowDecision('Reached max decision retry attempts.')
    } else if (context.nextActivity.retryAttempts >= MAX_ACTIVITY_RETRY_ATTEMPTS) {
      decisions = app.plugins.aws.getFailWorkflowDecision('Reached max activity retry attempts.')
    } else {
      decisions = app.plugins.aws.getScheduleActivityDecision(context.nextActivity)
    }

    await app.plugins.aws.nextDecisions(task.taskToken, decisions, executionContext)

    log.info({
      op: 'decider',
      phase: 'wkfl-decision-task-executed',
      task: _.pick(task, ['taskToken']),
      executionContext,
      currentEvent,
      decisions
    })
  } catch (error) {
    log.error(error, '[decider] there was an error polling for desicions')
  }
}

function _executionContext(context) {
  const ACTIVITIES = _ACTIVITIES(context)

  return {
    ..._.omit(context, ['activities', 'trigger', 'inputs', 'wkfl', 'nextActivity']),
    WKFL: context.wkfl || {},
    TRIGGER: context.trigger || {},
    ACTIVITIES,
    THIS: {
      ...(context.nextActivity || {}),
      outputs: _.get(ACTIVITIES, [_.get(context, 'nextActivity.key'), 'outputs'])
    }
  }
