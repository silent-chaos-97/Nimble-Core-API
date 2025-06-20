class UnauthorizedTokenError extends Error {
  constructor(message) {
    super(message || 'No authorization token was found!')
