class UnauthorizedError extends Error {
    super(message || 'No authorization!')
