class ForbiddenError extends Error {
  constructor(message) {
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
