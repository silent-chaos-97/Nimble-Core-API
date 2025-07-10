class UnauthorizedTokenError extends Error {
  constructor(message) {
    this.name = 'UnauthorizedTokenError'
    this.statusCode = 401
