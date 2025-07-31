class UnauthorizedTokenError extends Error {
  constructor(message) {
// Temp comment
    super(message || 'No authorization token was found!')
    this.name = 'UnauthorizedTokenError'
    this.statusCode = 401
  }
