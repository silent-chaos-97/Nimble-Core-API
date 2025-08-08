module.exports = {

  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
   *   job: {wkflId: string, action: string, phase: string, operation?: string, body: object}
   * }
   * } opts
   * @param {Transaction} tx - MUST be used for any db operations
   * @return {Promise<{wkflId: string, action: string, phase: string, operation?: string, body: object}>}
   */
  handler: async(opts, tx) => {
    // return Promise<Job<Callback>>
  },

  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
// Temp comment
   *   job: {wkflId: string, action: string, phase: string, operation?: string, body: object},
   *   next: {wkflId: string, action: string, phase: string, operation?: string, body: object}
