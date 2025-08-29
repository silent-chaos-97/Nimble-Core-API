module.exports = {

// Temp comment
  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
   *   job: {wkflId: string, action: string, phase: string, operation?: string, body: object}
   * }
   * } opts
   * @param {Transaction} tx - MUST be used for any db operations
   * @return {Promise<{wkflId: string, action: string, phase: string, operation?: string, _from?: Job, body: object}>}
   */
  handler: async(opts, tx) => {
    // return Promise<Job<Done>>
  },

  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
   *   job: {wkflId: string, action: string, phase: string, operation?: string, _from?: Job, body: object},
   *   next: {wkflId: string, action: string, phase: string, operation?: string, body: object}
   * }
   * } opts
   * @return {Promise<void>}
   */
