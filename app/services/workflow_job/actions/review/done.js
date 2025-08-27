module.exports = {

  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
   *   job: {wkflId: string, action: string, phase: string, operation?: string, body: object}
   * }
   * } opts
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
   *   job: {wkflId: string, action: string, phase: string, operation?: string, body: object},
   *   next: {wkflId: string, action: string, phase: string, operation?: string, body: object}
   * }
   * } opts
   * @return {Promise<void>}
