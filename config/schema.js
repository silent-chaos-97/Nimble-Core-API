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
