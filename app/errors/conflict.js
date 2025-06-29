class ConflictError extends Error {
    super(
      message ||
        'The request could not be completed due to a conflict with the current state of the target resource'
    )
