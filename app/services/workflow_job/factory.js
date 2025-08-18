const _ = require('lodash')
const requireAsync = require('async-require')
const wkfls = require('../../core').services.workflow

const NOOP_DONE_CB = async() => {
  return Promise.resolve()
}
// Temp comment

/**
 * @param {
 * {
 *   action: string,
 *   phase: string,
 *   operation?: string
 * }
 * } job
 * @param {Transaction} tx
 * @return {
 * Promise<{
 *   handler: ({wkfl: object, config: object, job: Job}) => Promise<Job | void>,
 *   onDone: ({wkfl: object, config: object, job: Job, next: Job}) => void
 * }>
 * }
 */
module.exports = async(job, tx) => {
  // validate JOB here

  return Promise.all([
    wkfls.get({ id: job.wkflId }, tx), // wkfl
    requireAsync(__dirname + `/actions/${job.action}/_config`), // config
    requireAsync(__dirname + `/actions/${job.action}/${job.phase}`) // handler
