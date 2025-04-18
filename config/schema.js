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
