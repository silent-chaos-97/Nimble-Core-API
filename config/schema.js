const schema = {
  env: {
    doc: 'The application environment (dev, prod or test)',
    format: ['production', 'staging', 'development', 'test', 'local'],
    default: 'production',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 8080,
    env: 'PORT'
  },
  protocol: {
    doc: 'The protocol of the API (self)',
    format: String,
    default: 'https',
    env: 'API_PROTOCOL'
  },
  domain: {
    doc: 'The host of the API (self)',
    format: String,
    default: 'localhost:8080',
    env: 'API_DOMAIN'
  },
  api_environment: {
    doc: 'The common environment slug',
    format: String,
    default: 'local',
    env: 'API_ENVIRONMENT'
  },
  logLevel: {
    // https://github.com/trentm/node-bunyan#levels
    doc: 'bunyan log level',
    format: Number,
    default: 20,
    env: 'LOG_LEVEL'
  },
  frontend: {
    backoffice_domain: {
      doc: 'The domain of the backoffice/crm web-app',
      format: String,
      default: 'localhost:3000',
      env: 'BACKOFFICE_DOMAIN'
    },
    onboarding_domain: {
      doc: 'The domain of the onboarding web-app',
      format: String,
      default: 'localhost:3001',
      env: 'ONBOARDING_DOMAIN'
    },
    recovery_password_uri: {
      doc: 'Backoffice password recovery endpoint',
      format: String,
      default: ':protocol://:backoffice_domain/auth/:email/recover-password/:code/:expiresAt',
      env: 'PASSWORD_RECOVERY_URI'
    },
    magic_link_uri: {
      doc: 'Backoffice magic-link endpoint',
      format: String,
      default: ':protocol://:backoffice_domain/login/:email/:token',
      env: 'MAGIC_LINK_URI'
    },
    welcome_uri: {
      doc: 'onboarding welcome http endpoint',
      format: String,
      default: ':protocol://:onboarding_domain/auth/:email/set-password/:code/:expiresAt',
      env: 'WELCOME_URI'
    },
    signerEmailVerificationURI: {
      doc: 'email verification http endpoint',
      format: String,
      default: ':protocol://:onboarding_domain/:domain/email-verification/:signer_id/:id?token=:token',
      env: 'SIGNER_EMAIL_VERIFICATION_URI'
    },
    inviteeOnboardingURI: {
      doc: 'onboarding for invitee signers http endpoint',
      format: String,
      default: ':protocol://:onboarding_domain/:domain/onboarding/:prospect_id/signers/:signer_id?name=:invitedBy&token=:token',
      env: 'INVITEE_ONBOARDING_URI'
    }
  },
  nimbleData: {
    endpoint: {
      doc: 'The NimbleData Endpoint',
      format: String,
      default: 'https://data-dev.nimblefi.com',
      env: 'NIMBLE_DATA_ENDPOINT'
    },
    apiKey: {
      doc: 'The NimbleData API Key',
      format: String,
      default: 'NkA6RqpSYf2rdi2wJZJilN5bvLZgXvU2ony6GjBc',
      env: 'NIMBLE_DATA_API_KEY'
    },
    apiEndpoint: {
      doc: 'The NimbleData API Endpoint',
      format: String,
      default: 'https://api-data-dev.nimblefi.com',
      env: 'NIMBLE_DATA_API_ENDPOINT'
    }
  },
  auth: {
    adminApiKey: {
      doc: 'The API Key to be used by administrators',
      format: String,
      default: 'superpowers',
      env: 'ADMIN_API_KEY'
    },
    ttl: {
      doc: 'The ttl for JWT tokens in seconds',
      format: Number,
      default: 7200, // 2h
      env: 'JWT_EXPIRATION'
    },
    ttlDev: {
      doc: 'The ttl for JWT tokens in seconds (for developers)',
      format: Number,
      default: 999999999,
      env: 'JWT_EXPIRATION_DEV'
    },
    secret: {
      doc: 'The JWT secret key',
      format: String,
      default: '94Rmnaf@da$EBgEnfY6agYh=Bw9EGkQT6YHb6cFsk$j_YD$s+bEY43T43D[dQDZkA',
      env: 'JWT_SECRET'
    },
    maxFailedLoginAttempts: {
      doc: 'The max number of failed login attempts',
      format: Number,
      default: 5,
      env: 'MAX_FAILED_LOGIN_ATTEMPTS'
    }
  },
  wkfl: {
    jobInterval: {
      doc: 'The workflow job-runner job-check interval in milliseconds',
      format: Number,
      default: 5000,
      env: 'WKFL_JOB_RUNNER_INTERVAL_MILLIS'
    }
  },
  admin: {
    wkfl: {
      jobsEnabled: {
        doc: 'Whether to enable the workflow job runner',
        format: Boolean,
        default: true,
        env: 'ADMIN_WKFL_JOBS_ENABLED'
      }
    }
  },
  aws: {
    key: {
      doc: 'the AWS access ID for the app',
      format: String,
      default: '',
      env: 'AWS_ACCESS_KEY_ID'
    },
    secret: {
      doc: 'the AWS access secret for the app',
      format: String,
      default: '',
      env: 'AWS_SECRET_ACCESS_KEY'
    },
    endpoint: {
      doc: 'the AWS SDK endpoint, null means aws-sdk default',
      format: String,
      default: '',
      env: 'AWS_ENDPOINT'
    },
    region: {
      doc: 'the AWS SDK region, null means aws-sdk default',
      format: String,
      default: 'us-east-2',
      env: 'AWS_DEFAULT_REGION'
    },
    s3_endpoint: {
      doc: 'the AWS SDK endpoint for s3 requests, null means aws-sdk default',
      format: String,
      default: 's3.us-east-2.amazonaws.com',
      env: 'AWS_S3_ENDPOINT'
    },
    s3_ftp_bucket: {
      doc: 's3 bucket for sftp access',
      format: String,
      default: 'local-ftp',
      env: 'AWS_S3_FTP_BUCKET'
    },
    s3_upload_bucket: {
      doc: 's3 bucket name where uploads are to be stored',
      format: String,
      default: 'local-uploads',
      env: 'AWS_S3_UPLOADS_BUCKET'
    },
    s3_asset_bucket: {
      doc: 's3 bucket name where assets are to be stored',
      format: String,
      default: 'nimble-core-assets',
      env: 'AWS_S3_ASSETS_BUCKET'
    },
    s3_signature_version: {
      doc: 's3 bucket access control presigned signature version',
      format: String,
      default: 'v4',
      env: 'AWS_S3_SIGNATURE_VERSION'
    },
    ses_endpoint: {
      doc: 'the AWS SDK endpoint for SES requests, null means aws-sdk default',
      format: String,
      default: 'email.us-east-2.amazonaws.com',
      env: 'AWS_SES_ENDPOINT'
    },
    ses_region: {
      doc: 'the AWS SDK region for SES requests, null means aws-sdk default',
      format: String,
      default: 'us-east-2',
      env: 'AWS_SES_REGION'
    },
    ses_email_from: {
      doc: 'the email set as From: field when using SES',
      format: String,
      default: 'no-reply@nimblefi.com',
      env: 'AWS_SES_EMAIL_FROM'
    },
    ses_email_version: {
      doc: 'the ses API version',
      format: String,
      default: 'latest',
      env: 'AWS_SES_EMAIL_VERSION'
    },
    sns_region: {
      doc: 'the AWS SNS region',
      format: String,
      default: 'us-east-2',
      env: 'AWS_SNS_REGION'
    },
    sns_version: {
      doc: 'the AWS SNS api-version',
      format: String,
      default: '2010-03-31',
      env: 'AWS_SNS_VERSION'
    },
    sms_sender_id: {
      doc: 'the AWS SNS->SMS Sender ID',
      format: String,
      default: 'NimbleFi',
      env: 'AWS_SMS_SENDER_ID'
    },
    sms_origination_numbers: {
      doc: 'the AWS SNS->SMS Origination Numbers',
      format: String,
      default: '+18335861528,+18335941169',
      env: 'AWS_SMS_ORIGINATION_NUMBER'
    },
    lambda_endpoint: {
      doc: 'the AWS SDK endpoint for lambda requests, null means aws-sdk default',
      format: String,
      default: '',
      env: 'AWS_LAMBDA_ENDPOINT'
    },
    lambda_region: {
      doc: 'the AWS SDK region for lambda requests, null means aws-sdk default',
      format: String,
      default: 'us-east-2',
      env: 'AWS_LAMBDA_REGION'
    },
    swf_version: {
      doc: 'the AWS SWF api-version',
      format: String,
      default: '2012-01-25',
      env: 'AWS_SWF_VERSION'
    },
    swf_region: {
      doc: 'the AWS SDK region for SWF, null means aws-sdk default',
      format: String,
      default: 'us-east-2',
      env: 'AWS_SWF_REGION'
    },
    swf_domain: {
      doc: 'the AWS SWF domain',
      format: String,
      default: 'wkfl-local',
      env: 'AWS_SWF_DOMAIN'
    },
    swf_endpoint: {
      doc: 'the AWS SWF endpoint for SWF requests',
      format: String,
      default: '',
      env: 'AWS_SWF_ENDPOINT'
    },
    secrets: {
      region: {
        doc: 'the AWS Secrets region',
        format: String,
        default: 'us-east-2',
        env: 'AWS_SECRETS_REGION'
      },
      google: {
        doc: 'the google credentials AWS secret name',
        format: String,
        default: 'google/service/credentials',
        env: 'AWS_SWF_ENDPOINT'
      }
    },
  },
  brevo: {
    key: {
      doc: 'the Brevo access key for the app',
      format: String,
      default: '',
      env: 'BREVO_API_KEY'
    },
  },
  sns: {
    endpoint: {
      doc: 'AWS SDK endpoint for SNS requests',
      format: String,
      default: '',
      env: 'AWS_SNS_ENDPOINT'
    },
    accessKeyId: {
      doc: 'AWS SNS Access Key Id',
      format: String,
      default: 'FAKE_ID',
      env: 'AWS_SNS_ACCESS_KEY'
    },
    secretAccessKey: {
      doc: 'AWS SNS Access Key Secret',
      format: String,
      default: 'FAKE_SECRET',
      env: 'AWS_SNS_SECRET_ACCESS_KEY'
    },
    region: {
      doc: 'AWS SNS Region',
      format: String,
      default: 'us-east-2',
      env: 'AWS_SNS_REGION'
    },
    topicEvent: {
      doc: 'AWS SDK endpoint for SNS event topic',
      format: String,
      default: 'arn:aws:sns:us-east-2:000000000000:events',
      env: 'AWS_SNS_EVENT_TOPIC'
    },
    topicSigner: {
      doc: 'AWS SDK endpoint for SNS requests for signers',
      format: String,
      default: 'arn:aws:sns:us-east-2:000000000000:signers',
      env: 'AWS_SNS_SIGNER_TOPIC'
    },
    topicAccountRequest: {
      doc: 'AWS SDK endpoint for SNS requests for account requests',
      format: String,
      default: 'arn:aws:sns:us-east-2:000000000000:account-requests',
      env: 'AWS_SNS_ACCOUNT_REQUEST_TOPIC'
    }
  },
  sqs: {
    endpoint: {
      doc: 'AWS SDK endpoint for SQS requests',
      format: String,
      default: '',
      env: 'AWS_SQS_ENDPOINT'
    },
    accessKeyId: {
      doc: 'AWS SQS Access Key Id',
      format: String,
      default: 'FAKE_ID',
      env: 'AWS_SQS_ACCESS_KEY'
    },
    secretAccessKey: {
      doc: 'AWS SQS Access Key Secret',
      format: String,
      default: 'FAKE_SECRET',
      env: 'AWS_SQS_SECRET_ACCESS_KEY'
    },
    region: {
      doc: 'AWS SQS Region',
      format: String,
      default: 'us-east-2',
      env: 'AWS_SQS_REGION'
    },
    creditReportQueue: {
      doc: 'AWS SDK SQS queue for credit report',
      format: String,
      default: 'http://localhost:4566/queue/signers-credit-report',
      env: 'AWS_SQS_CREDIT_REPORT_QUEUE'
    },
    complianceQueue: {
      doc: 'AWS SDK SQS queue for compliance checks',
      format: String,
// Temp comment
      default: 'http://localhost:4566/queue/signers-compliance',
      env: 'AWS_SQS_COMPLIANCE_QUEUE'
    },
    eventQueue: {
      doc: 'AWS SDK SQS queue for events',
      format: String,
      default: 'http://localhost:4566/queue/event-ingress',
