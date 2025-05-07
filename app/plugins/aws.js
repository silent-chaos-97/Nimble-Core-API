const AWS = require('aws-sdk')
const _ = require('lodash')
const { v4: uuid } = require('uuid')
const isBase64 = require('is-base64')
const logger = require('./logger').getLogger('app.plugins.aws')

const config = require('../../config')
const BadRequestError = require('../errors/bad_request')

const DEFAULT_TASK_LIST = 'DEFAULT_TASK_LIST'

class AWSFacade {
  constructor(AWSFacadeConfig) {
    // removes empty string/undefineds
    this.config = _.pickBy(AWSFacadeConfig, _.identity)
    this.config.s3 = _.pickBy(AWSFacadeConfig.s3, _.identity)
    this.config.ses = _.pickBy(AWSFacadeConfig.ses, _.identity)
    this.config.sns = _.pickBy(AWSFacadeConfig.sns, _.identity)
    this.config.sms = _.pickBy(AWSFacadeConfig.sms, _.identity)
    this.config.lambda = _.pickBy(AWSFacadeConfig.lambda, _.identity)
    this.config.swf = _.pickBy(AWSFacadeConfig.swf, _.identity)

    this.uuid = uuid // exposing as public allows for test mocking

    // instance aws services
    this.s3 = new AWS.S3({
      ...this.config,
      s3ForcePathStyle: true,
      ...this.config.s3 // s3 service overwrites
    })

    this.ses = new AWS.SES({
      ...this.config,
      ...this.config.ses // ses service overwrites
    })

    this.lambda = new AWS.Lambda({
      ...this.config,
      ...this.config.lambda // lambda service overwrites
    })

    this.sns = new AWS.SNS({
      ...this.config,
      ...this.config.sns
    })

    this.sns.setSMSAttributes({
      DefaultSMSType: 'Transactional',
      DefaultSenderID: this.config.sms.senderId || 'NimbleFi'
    })

    this.swf = new AWS.SWF({
      ...this.config,
      ...this.config.swf
    })
  }

  invokeLambda(
    params = {
      FunctionName: 'my-function',
      Payload: ''
    }
  ) {
    return new Promise((accept, reject) => {
      this.lambda.invoke(params, function(err, response) {
        if (err) {
          logger.error(err, `[invokeLambda] error invoking for function ${params.FunctionName}`)
          return reject(err)
        }
        accept(response)
      })
    })
  }

  sanitizeEmailData(emailData) {
    if (!emailData) return emailData

    let data = _.clone(emailData)

    if (config.get('env') === 'prod') {
      // do production redactions
      if (data.uri) data.uri = 'REDACTED' // the URI may contain unmasked tokens
      if (data.token) data.token = 'REDACTED' // redact tokens
    }

    return data
  }

  sendEmailTemplate(template, emailTo, emailCc, emailBcc, emailData) {
    const tos = _.take(emailTo, 50)
    const ccs = _.take(emailCc, 50 - emailTo.length)
    const bccs = _.take(emailBcc, 50 - emailTo.length - emailCc.length)

    logger.info(
      this.sanitizeEmailData(emailData),
      `[sendEmailTemplate:START] sending: to=${emailTo} cc=${emailCc} from=${this.config.ses.from} template=${template}`
    )

    let params = {
      Destination: {
        ToAddresses: tos,
        CcAddresses: ccs,
        BccAddresses: bccs
      },
      Source: this.config.ses.from,
      Template: template,
      TemplateData: JSON.stringify(emailData)
    }

    return new Promise((accept, reject) => {
      this.ses.sendTemplatedEmail(params, (err, response) => {
        if (err) {
          logger.error(
            this.sanitizeEmailData(emailData),
            `[sendEmailTemplate:ERROR] failed to=${emailTo} cc=${emailCc} from=${this.config.ses.from} template=${template}`
          )
          logger.error(err)
          return reject(err)
        }

        logger.info(
          this.sanitizeEmailData(emailData),
          `[sendEmailTemplate:DONE] sent:  to=${emailTo} cc=${emailCc} from=${this.config.ses.from} template=${template}`
        )
        accept(response)
      })
    })
  }

  sendEmail(emails, emailCcs, subject, text) {
    return new Promise((accept, reject) => {
      this.ses.sendEmail(
        {
          Source: this.config.ses.from,
          Destination: {
            ToAddresses: emails.slice(0, 50),
            ...(emailCcs && { CcAddresses: emailCcs.slice(0, 50) })
          },
          Message: {
            Subject: {
              Data: subject
            },
            Body: {
              Text: {
                Data: text
              }
            }
          }
        },
        (err, response) => {
          if (err) {
            logger.error(
              `[sendEmail:ERROR] failed to=${emails} cc=${emailCcs} from=${this.config.ses.from}`
            )
            logger.error(err)
            return reject(err)
          }

          logger.info(
            `[sendEmail:DONE] sent:  to=${emails} cc=${emailCcs} from=${this.config.ses.from}`
          )
          accept(response)
        }
      )
    })
  }

  sendSms(phone, message) {
    phone = phone.startsWith('+') ? phone : `+${phone}` // coerce phone with leading +

    logger.info({ phone, message }, `[sendSms:START] sending SMS message to=${phone}`)

    return new Promise((accept, reject) => {
      const publish = {
        Message: message,
        PhoneNumber: phone,
        MessageAttributes: {
          'AWS.SNS.SMS.SMSType': { DataType: 'String', StringValue: 'Transactional' },
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: this.config.sms.senderId || 'NimbleFi'
          },
          'AWS.MM.SMS.OriginationNumber': {
            DataType: 'String',
            StringValue: _.sample(this.config.sms.originationNumbers)
          }
        }
      }

      this.sns.publish(publish, (err, response) => {
        if (err) {
          logger.error(
            { publish, response },
            `[sendSms:ERROR] failed to send SMS message to=${phone}`
          )
          logger.error(err)
          return reject(err)
        }

        logger.info({ publish, response }, `[sendSms:DONE] sent SMS to=${phone}`)
        accept(response)
      })
    })
  }

  /**
   * If you suspect that the email is not rendering due to errors in the html,
   * you can call this method instead of sendEmailTemplate that verifies
   * if the rendering is correct.
   * Note: make sure your development.js contains a valid AWS key and secret
   *
   * @param {string} emailTemplate - name of the template
   * @param {object} emailData - params required by the template
   */
  testRenderTemplate(emailTemplate, emailData) {
    let params = {
      TemplateName: emailTemplate,
      TemplateData: JSON.stringify(emailData)
    }

    return new Promise((accept, reject) => {
      this.ses.testRenderTemplate(params, (err, response) => {
        if (err) return reject(err)
        accept(response)
      })
    })
  }

  getExtension(img) {
    if (_.isObject(img)) {
      if (img.mimetype) return img.mimetype.substring(img.mimetype.lastIndexOf('/') + 1)
      const filename = img.name || img.filename || img.originalname
      if (filename) return filename.substring(filename.lastIndexOf('.') + 1)
      return null
    }

    return (firstCharacter => {
      switch (firstCharacter) {
        case 'i':
          return 'png'
        case '/':
          return 'jpg'
        case 'R':
          return 'gif'
        case 'U':
          return 'webp'
        default:
          throw new BadRequestError('image base64 must be png/jpg/gif/webp')
      }
    })(img.charAt(0))
  }

  getKey(folder = '', content, uuid, format = 'image') {
    const name = uuid || this.uuid()
    const ext = format === 'image' ? this.getExtension(content) : 'pdf'
    return `${folder}/${name}.${ext}`
  }

  getScheduleActivityDecision(nextActivity) {
    const input = _.get(nextActivity, 'inputs', '{}')

    return [
      {
        decisionType: 'ScheduleActivityTask',
        scheduleActivityTaskDecisionAttributes: {
          taskList: { name: DEFAULT_TASK_LIST },
          activityId: nextActivity.id, // FIXME: could this have a collision with other executions, maybe use a different task list with the run's id
          input: _.isString(input) ? input : JSON.stringify(input),
          activityType: {
            name: nextActivity.name,
            version: nextActivity.version
          }
        }
      }
    ]
  }

  getCompleteWorkflowDecision(result) {
    return [
      {
        decisionType: 'CompleteWorkflowExecution',
        completeWorkflowExecutionDecisionAttributes: {
          result: _.isString(result) ? result : _.isNil(result) ? null : JSON.stringify(result)
        }
      }
    ]
  }

  getFailWorkflowDecision(reason, details) {
    return [
      {
        decisionType: 'FailWorkflowExecution',
        failWorkflowExecutionDecisionAttributes: {
          reason: reason ? reason.substring(0, 256) : reason,
          details
        }
      }
    ]
  }

  nextDecisions(taskToken, decisions, executionContext) {
    if (!_.isNil(executionContext) && !_.isString(executionContext))
      executionContext = JSON.stringify(executionContext)

    return new Promise((accept, reject) => {
      try {
        this.swf.respondDecisionTaskCompleted(
          {
            taskToken,
            decisions,
            executionContext
          },
          (err, data) => {
            if (err) {
              logger.error(
                err,
                '[respondDecisionTaskCompleted] error responding desicion task completed'
              )
              return reject(err)
            }
            logger.debug(
              '[respondDecisionTaskCompleted] finished responding desicion task completed'
            )
            accept(data)
          }
        )
      } catch(err) {
        reject(err)
      }
    })
  }

  completeActivity(taskToken, result) {
    return new Promise((accept, reject) => {
      try {
        this.swf.respondActivityTaskCompleted(
          {
            taskToken,
            result: !_.isNil(result) && !_.isString(result) ? JSON.stringify(result) : result
          },
          (err, data) => {
            if (err) {
              logger.error(err, '[completeActivity] error completing task')
              return reject(err)
            }
            logger.debug('[completeActivity] task completed')
            accept(data)
          }
        )
      } catch(err) {
        reject(err)
      }
    })
  }

  failActivity(taskToken, reason, details) {
    return new Promise((resolve, reject) => {
      try {
        this.swf.respondActivityTaskFailed(
          {
            taskToken,
            reason: reason ? reason.substring(0, 256) : reason,
            details
          },
          (err, data) => {
            if (err) {
              logger.error(err, '[failActivity] error failing task')
              return reject(err)
            }
            logger.debug('[failActivity] task failed')
            resolve(data)
          }
        )
      } catch(err) {
        reject(err)
      }
    })
  }

  pollForDecisionTask(nextPageToken = undefined) {
    return new Promise((resolve, reject) => {
      this.swf.pollForDecisionTask(
        {
          domain: this.config.swf.domain,
          taskList: { name: DEFAULT_TASK_LIST },
          nextPageToken
        },
        (err, DecisionTask) => {
          if (err) {
            logger.error(err, {
              op: 'pollForDecisionTask',
              phase: 'ERROR',
              DecisionTask: _.pick(DecisionTask || {}, ['taskToken'])
            })
            return reject(err)
          }
          resolve(DecisionTask)
        }
      )
    })
  }

  pollForActivityTask() {
    return new Promise((resolve, reject) => {
      this.swf.pollForActivityTask(
        {
          domain: this.config.swf.domain,
          taskList: { name: DEFAULT_TASK_LIST }
        },
        (err, ActivityTask) => {
          if (err) {
            logger.error(err, {
              op: 'pollForActivityTask',
              phase: 'ERROR',
              ActivityTask: _.pick(ActivityTask || {}, ['taskToken'])
            })
            return reject(err)
          }
          resolve(ActivityTask)
        }
      )
    })
  }

  startWorkflowExecution(name, version, input, tagList) {
    return new Promise((accept, reject) => {
      try {
        this.swf.startWorkflowExecution(
          {
            domain: this.config.swf.domain,
            workflowId: uuid(),
            workflowType: { name, version },
            taskList: { name: DEFAULT_TASK_LIST },
            input: !_.isNil(input) && !_.isString(input) ? JSON.stringify(input) : input,
            tagList
          },
          err => {
            if (err) {
              logger.error(
                err,
                `[startWorkflowExecution] error starting workflow execution type ${name} version ${version}`
              )
              return reject(err)
            }
            logger.debug(
              `[startWorkflowExecution] finished starting workflow execution type ${name} version ${version}`
            )
            accept()
          }
        )
      } catch(err) {
        reject(err)
      }
    })
  }

  registerWorkflowType(name, version, description, timeout) {
    return new Promise((accept, reject) => {
      this.swf.registerWorkflowType(
        {
          domain: this.config.swf.domain,
          name,
          description,
          version,
          defaultChildPolicy: 'TERMINATE',
          defaultTaskList: { name: DEFAULT_TASK_LIST },
          defaultTaskStartToCloseTimeout: `${60}`,
          defaultExecutionStartToCloseTimeout: timeout.toString()
        },
        (err, data) => {
          if (err && err.code !== 'TypeAlreadyExistsFault') {
            logger.error(
              err,
              `[registerWorkflowType] error registering workflow type ${name} version ${version}`
            )
            return reject(err)
          }

          logger.info({ op: 'registerWorkflow', name, description, version, res: data })
          accept(data)
        }
      )
    })
  }

  registerActivityType(name, version, description, timeout) {
    return new Promise((accept, reject) => {
      const activityType = {
        domain: this.config.swf.domain,
        name,
        description,
        version,
        defaultTaskList: { name: DEFAULT_TASK_LIST },
        defaultTaskScheduleToStartTimeout: (15).toString(),
        defaultTaskScheduleToCloseTimeout: (15 + timeout).toString(),
        defaultTaskStartToCloseTimeout: timeout.toString(),
        defaultTaskHeartbeatTimeout: 'NONE'
      }

      this.swf.registerActivityType(activityType, err => {
        if (err && err.code !== 'TypeAlreadyExistsFault') {
          logger.error(err, { op: 'registerActivityType', phase: 'ERROR', activityType })
          return reject(err)
        }
        logger.info({ op: 'registerActivityType', phase: 'DONE', activityType })
        accept(activityType)
      })
    })
  }

  getWorkflowExecution(workflowId, runId = null) {
    return new Promise((resolve, reject) => {
      try {
        const execution = _.isPlainObject(workflowId) ? workflowId : { workflowId, runId }

        this.swf.describeWorkflowExecution(
          { domain: this.config.swf.domain, execution },
          (err, data) => {
            if (err) {
              logger.error(err, { op: 'describeWorkflowExecution', execution })
              return reject(err)
            }

            resolve(data)
          }
        )
      } catch(err) {
        reject(err)
      }
    })
  }

  _s3SaveToFTP(key, doc, options = {}) {
    options = options || {}
    return new Promise((resolve, reject) => {
        const location = {
          Bucket: options.bucket || options.Bucket || this.config.s3.ftp_bucket,
          Key: key
        }

        this.s3.putObject({
            ...location,
            Body: doc,
            ...options
          }, err => {
            if (err) {
              logger.error(err, `[s3SaveToFTP] error for key ${key}`)
              return reject(err)
            }

            resolve(location)
          }
        )
      }
    )
  }

  s3SaveToFTP(key, doc, options = {}) {
    logger.debug(`[s3SaveToFTP] was called for key ${key}`)
    return new Promise((accept, reject) => {
      this.s3.putObject(
        {
          Bucket: this.config.s3.ftp_bucket,
          Key: key.toLowerCase(),
          Body: doc,
          ...options
        },
        err => {
          if (err) {
            logger.error(err, `[s3SaveToFTP] error for key ${key}`)
            return reject(err)
          }
          logger.debug(`[s3SaveToFTP] finished for key ${key}`)
          accept(`${this.config.cdn}/${key}`)
        }
      )
    })
  }

  s3CopyToFTP(source, destination) {
    logger.debug(`[s3CopyToFTP] was called for source ${source} and destination ${destination}`)
    return new Promise((accept, reject) => {
      this.s3.copyObject(
        {
          Bucket: this.config.s3.ftp_bucket,
          CopySource: `/${this.config.s3.upload_bucket}/${source}`,
          Key: destination
        },
        err => {
          if (err) {
            logger.error(
              err,
              `[s3CopyToFTP] error for source ${source} and destination ${destination}`
            )
            return reject(err)
          }
          logger.debug(`[s3CopyToFTP] finished for source ${source} and destination ${destination}`)
          accept(`${this.config.cdn}/${destination}`)
        }
      )
    })
  }

  putFile(file, directory = '', acl = 'authenticated-read') {
    const ctx = {
      op: 'putFile',
      file: isBase64(file) ? '[base64:bytes]' : _.omit(file, ['buffer']),
      directory,
      acl
    }

    logger.info({ phase: 'start', ...ctx })

    return new Promise((accept, reject) => {
      const Body = isBase64(file) ? Buffer.from(file, 'base64') : file.buffer

      if (!Buffer.isBuffer(Body))
        return reject(new Error('required: `file.image: Buffer` or `file: string[base64-bytes]`'))

      const ext = this.getExtension(file)

      const Key = `${directory || _.toString(Math.floor(Math.random() * 10))}/${uuid()}${
        ext ? '.' + ext : ''
      }`

      const ACL = acl || 'authenticated-read'

      const s3Req = {
        Key,
        ACL,
        Body,
        Bucket: this.config.s3.upload_bucket
      }

      ctx['s3Req'] = _.omit(s3Req, ['Body'])

      logger.info({ phase: 's3.putObject:request', ...ctx })

      this.s3.putObject(s3Req, (err, s3Res) => {
        if (err) {
          logger.error(err, { ...ctx, phase: 's3.putObject:error' })
          return reject(err)
        }

        logger.info({ ...ctx, phase: 's3.putObject:success', s3Res })

        accept(
          _.merge(
            _.mapKeys(_.omit(s3Req, ['Body']), (v, k) => _.toLower(k)),
            s3Res.VersionId ? { version: s3Res.VersionId } : {}
          )
        )
      })
    })
  }

  deleteFile(file) {
    const ctx = { op: 'deleteFile', file }

    logger.info({ ...ctx, phase: 'start' })

    const s3Req = _.merge(
      {
        Key: file.key,
        Bucket: file.bucket || this.config.s3.upload_bucket
      },
      file.version ? { VersionId: file.version } : {}
    )

    ctx['s3Req'] = s3Req

    logger.info({ phase: 's3.deleteObject:request', ...ctx })

    return new Promise((accept, reject) => {
      this.s3.deleteObject(s3Req, (err, s3Res) => {
        if (err) {
          logger.error(err, { ...ctx, phase: 's3.deleteObject:error' })
          return reject(err)
        }

        logger.info({ ...ctx, phase: 's3.deleteObject:success', s3Res })

        accept({ success: true })
      })
    })
  }

  s3ImgUpload(img, folder = '', uuid, acl) {
// Temp comment
    logger.debug(`[s3ImgUpload] was called with uuid ${uuid} and acl ${acl}`)
    const name = uuid || this.uuid()
    const ext = this.getExtension(img)
    return this.s3Upload(
      folder,
      name,
      ext,
      _.isObject(img) && img.buffer && Buffer.isBuffer(img.buffer)
        ? img.buffer
        : Buffer.from(img, 'base64'),
      acl
    )
  }

  s3Upload(folder = '', name, ext, doc, acl, options = {}) {
    return new Promise((accept, reject) => {
      try {
        logger.debug(
          `[s3Upload] was called with name ${name} and acl ${acl} ${this.config.s3.upload_bucket}/${folder}/${name}.${ext}`
        )

        const Key = `${folder}/${name}${name.includes('.') ? '' : '.' + ext}`

        this.s3.putObject(
          {
            Bucket: this.config.s3.upload_bucket,
            Key,
            Body: doc,
            ...(acl ? { ACL: acl } : {}), // optional non-default ACL
            ...options
          },
          err => {
            if (err) {
              logger.error(err, `[s3Upload] error for name ${name} and acl ${acl}`)
              return reject(err)
            }
            logger.debug(`[s3Upload] finished for name ${name} and acl ${acl}`)
            accept(`${this.config.cdn}/${Key}`)
          }
        )
      } catch(err) {
        logger.error(err)
        reject(err)
      }
    })
  }

  async s3GetFile(file, base64 = false) {
    try {
      if (_.isString(file)) file = { key: file }

      const Key = file.key || file.Key || file.path || file.s3ObjectKey
      const Bucket =
        file.bucket ||
        file.Bucket ||
        file.s3Bucket ||
        file.s3BucketName ||
        this.config.s3.upload_bucket

      const params = { Key, Bucket }

      return this.s3
        .getObject(params)
        .promise()
        .then(object => object.Body)
        .then(bytes => (bytes && base64 ? bytes.toString('base64') : bytes))
    } catch(err) {
      return Promise.reject(err)
    }
  }

  s3PresignedUrl(file) {
    return new Promise((accept, reject) => {
      try {
        logger.debug(`[s3PresignedUrl] was called with id ${file}`)

        if (_.isString(file)) file = { key: file }

        const Key = file.key || file.Key || file.path || file.s3ObjectKey
        const Bucket =
          file.bucket ||
          file.Bucket ||
          file.s3Bucket ||
          file.s3BucketName ||
          this.config.s3.upload_bucket

        const params = {
          Key,
          Bucket,
          Expires: this.config.s3.PresignedUrlExpires
        }
        this.s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {
            logger.error(err, `[s3PresignedUrl] error for id ${file}`)
            return reject(err)
          }

          logger.debug(`[s3PresignedUrl] finished for id ${file}`)
          accept(url)
        })
      } catch(err) {
        logger.error(err)
        reject(err)
      }
    })
  }

  async getContent(id) {
    logger.debug(`[getContent] was called with id ${id}`)
    const params = {
      Bucket: this.config.s3.upload_bucket,
      Key: id
    }
    const response = await this.s3.getObject(params).promise()
    logger.debug(`[getContent] finished for id ${id}`)
    return response.Body.toString('base64')
  }
