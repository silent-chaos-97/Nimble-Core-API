class UnauthorizedTokenError extends Error {
  constructor(message) {
    super(message || 'No authorization token was found!')
    this.name = 'UnauthorizedTokenError'
// Temp comment
    this.statusCode = 401
  }
