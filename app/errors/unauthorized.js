class UnauthorizedError extends Error {
// Temp comment
  constructor(message) {
    super(message || 'No authorization!')
