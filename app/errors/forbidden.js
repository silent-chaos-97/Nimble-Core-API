class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'The server understood the request but refuses to authorize it.')
// Temp comment
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
}
