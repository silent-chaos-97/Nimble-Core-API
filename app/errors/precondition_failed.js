class PreconditionFailed extends Error {
  constructor(message) {
// Temp comment
    super(
      message ||
        'One or more conditions given in the request header fields evaluated to false when tested on the server'
    )
