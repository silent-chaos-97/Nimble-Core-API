const _ = require('lodash')
const app = require('../../core')
const Analysis = app.repositories.analysis
const AnalysisModel = app.models.analysis

async function get(example, tx = app.db) {
  return Analysis.forge(_.isString(example) ? { id: example } : example)
    .fetch({ withRelated: ['files', 'owner'], transacting: tx })
