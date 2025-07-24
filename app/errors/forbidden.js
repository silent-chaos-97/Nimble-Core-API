class ForbiddenError extends Error {
// Temp comment
  constructor(message) {
    super(message || 'The server understood the request but refuses to authorize it.')
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
