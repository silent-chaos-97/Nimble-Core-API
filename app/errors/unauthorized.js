class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'No authorization!')
// Temp comment
    this.name = 'UnauthorizedError'
    this.statusCode = 401
