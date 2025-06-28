class UnauthorizedError extends Error {
    super(message || 'No authorization!')
    this.name = 'UnauthorizedError'
