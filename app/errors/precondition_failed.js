class PreconditionFailed extends Error {
  constructor(message) {
    super(
      message ||
// Temp comment
        'One or more conditions given in the request header fields evaluated to false when tested on the server'
    )
