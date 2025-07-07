const app = require('../../core')

async function get() {
  try {
    // verify we can execute a repository-backed service request
    // TODO: allow service to implement health and delegate to each; use explicit health table to prevent locks, etc
  } catch(err) {
    return {
      code: 500,
      status: 'Internal Server Error',
      message: `Unavailable: ${err.message}`
    }
  }

  return {
    code: 200,
    status: 'ok',
    message: 'Available'
  }
