const _ = require('lodash')
const requireAsync = require('async-require')
const wkfls = require('../../core').services.workflow

const NOOP_DONE_CB = async() => {
  return Promise.resolve()
}

/**
 * @param {
 * {
 *   action: string,
 *   phase: string,
 *   operation?: string
 * }
 * } job
 * @param {Transaction} tx
 * @return {
