class UnauthorizedError extends Error {
  constructor(message) {
    this.name = 'UnauthorizedError'
    this.statusCode = 401
