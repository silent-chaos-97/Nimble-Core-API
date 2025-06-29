class UnauthorizedError extends Error {
  constructor(message) {
// Temp comment
    super(message || 'No authorization!')
    this.name = 'UnauthorizedError'
