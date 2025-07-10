const _ = require('lodash')
const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.subscriber.factory')

  const name = opts.name

  const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    // removes empty string/undefineds
    ..._.omitBy(app.config.get('sqs'), _.isNil)
  })

  async function handleMessage(message) {
    try {
      logger.info(message, `[handleMessage] [${name}] message received`)

      const msg = unwrap(message) // unwrap the AWS message envelope (typically SNS -> SQS -> handler)

      logger.info(msg, `[handleMessage] delegating normalized message to [${name}].handleMessage...`)

      return opts.handleMessage(msg)
    } catch(err) {
      logger.error(err, `[handleMessage] [${name}] subscriber handle message failed with error`)
      throw err
    }
