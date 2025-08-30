const app = require('../../core')
const _ = require('lodash')
const { Producer } = require('sqs-producer')
const { SQSClient } = require('@aws-sdk/client-sqs')
const sqsConfig = _.pick(app.config.get('sqs'), ['endpoint', 'accessKeyId', 'secretAccessKey', 'region'])

let _queue

function queue() {
  if (!_queue) _queue = Producer.create({
    queueUrl,
    region: sqsConfig.region,
    sqs: new SQSClient({
      region: sqsConfig.region,
      credentials: {
        accessKeyId: sqsConfig.accessKeyId,
        secretAccessKey: sqsConfig.secretAccessKey
      }
    })
  })

  return _queue
}

/**
 * @param {
 * {
 *   wkflId: string,
 *   action: string,
 *   phase: string,
 *   operation?: string,
 *   _from?: Job,
 *   body: object
 * }
 * } job
 *
 * @param {
 * {
 *   wkfl: {id: string, trigger: {id: string}, actions: Array<{id: string}>},
 *   config: object
 * }
 * } opts
 * @return {Promise<*>}
 */
module.exports = async(job, opts, tx) => {

  // TODO: consider first persisting this to the db using `tx` to ensure atomic behavior, a scheduler can read the db jobs

  queue().send({
    id: '', // gen
    body: job,
    groupId: _.get(opts, 'wkfl.institutionId')
  })
}
