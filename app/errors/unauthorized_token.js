class UnauthorizedTokenError extends Error {
    super(message || 'No authorization token was found!')
    this.name = 'UnauthorizedTokenError'
    this.statusCode = 401
