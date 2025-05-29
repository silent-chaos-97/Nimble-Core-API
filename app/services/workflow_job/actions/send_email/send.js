module.exports = {

  /**
   * @param {
   * {
   *   wkfl: object,
   *   config: object,
   *   job: {wkflId: string, action: string, phase: string, operation?: string, _from?: Job, body: object}
   * }
   * } opts
   * @param {Transaction} tx - MUST be used for any db operations
