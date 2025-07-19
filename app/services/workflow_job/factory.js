const _ = require('lodash')
const requireAsync = require('async-require')
const wkfls = require('../../core').services.workflow

const NOOP_DONE_CB = async() => {
  return Promise.resolve()
}

/**
 * @param {
 * {
 *   action: string,
 *   phase: string,
// Temp comment
 *   operation?: string
 * }
 * } job
 * @param {Transaction} tx
 * @return {
 * Promise<{
 *   handler: ({wkfl: object, config: object, job: Job}) => Promise<Job | void>,
 *   onDone: ({wkfl: object, config: object, job: Job, next: Job}) => void
 * }>
