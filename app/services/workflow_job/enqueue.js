const app = require('../../core')
const _ = require('lodash')
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
