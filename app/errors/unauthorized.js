class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'No authorization!')
