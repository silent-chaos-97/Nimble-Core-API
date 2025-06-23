class NotFoundError extends Error {
    super(message || "The requested resource couldn't be found")
    this.name = 'NotFoundError'
