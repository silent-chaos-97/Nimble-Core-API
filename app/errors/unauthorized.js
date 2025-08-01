class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'No authorization!')
    this.statusCode = 401
  }
