const AWS = require('aws-sdk')
const _ = require('lodash')
const app = require('../../core')
const logger = app.logger.getLogger('app.services.event_stream.publish')

const client = new AWS.SNS({
  apiVersion: '2010-03-31',
  // removes empty string/undefineds
  ..._.pickBy(app.config.get('sns'), _.identity)
})

/**
 * @param stream the name of the stream or topic (or configuration key which references it)
 * @param {{id: string, event: string, type?: string, body: any, payload?: any }} event the event data being emitted
 * @param event.id identifier of the bound resource
 * @param event.event the type of event or resource
 * @param event.type? the type of event or resource (weak alias for event)
 * @param event.body the body of the event
 * @param event.payload? the body of the event (weak alias for body)
 *
 * @return {Promise<void>}
 */
async function publish(stream, event = { id: null, event: null, type: null, body: null }) {
  logger.info({ message: '[publish] PublishingEvent', stream, event })
  event = { ...event, event: event.event || event.type, body: event.body || event.payload }

  const Message = _.pick(event, ['id', 'event', 'body'])

  const PublishReq = { Message, TopicArn: event.topicArn || event.TopicArn || app.config.get('sns')[stream] }

  return client.publish({ ...PublishReq, Message: JSON.stringify(Message) }).promise()
    .then(response => logger.debug({ message: '[publish] EventPublished', MessageId: response.MessageId, PubReq: PublishReq }))
    .catch(err => logger.error(err, { message: '[publish] FailedToPublishEvent', PubReq: PublishReq }))
