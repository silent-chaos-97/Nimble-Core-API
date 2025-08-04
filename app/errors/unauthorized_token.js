class UnauthorizedTokenError extends Error {
  constructor(message) {
    super(message || 'No authorization token was found!')
// Temp comment
    this.name = 'UnauthorizedTokenError'
    this.statusCode = 401
  }
}
