const _ = require('lodash')

const TYPES = {
  adverseMedia: [
    "adverse-media-financial-crime",
    "adverse-media-fraud",
    "adverse-media-general",
    "adverse-media-narcotics",
    "adverse-media-sexual-crime",
    "adverse-media-terrorism",
    "adverse-media-violent-crime"
  ],
  politicalExposure: [
    "pep",
    "pep-class-1",
    "pep-class-2",
    "pep-class-3",
    "pep-class-4",
  ],
  warnings: [
    "warning",
    "fitness-probity"
  ],
  sanctions: [
    "sanction"
  ]
}

function getAdverseMedia(media) {
  return media.map(listing => {
    return {
      name: listing.title,
      value: listing.snippet,
      date: listing.date,
      deletedDate: null,
      url: listing.url,
      countryCodes: [],
      source: '',
      subtype: 'adverse-media'
    }
  })
}

function getSourcesFromTag(source_notes, types) {
  return Object.keys(source_notes).filter(key => {
    return _.intersection(source_notes[key].aml_types, types).length > 0
  }).map(id => ({ id, ...source_notes[id] }))
}

function getFieldBySource(fields, source) {
  const out = source.map((source) => {
    return fields
      .filter(f => _.has(f, 'source') && f.source === source.id)
      .map(listing => {
        return {
          name: listing.name,
          value: listing.value,
          source: source.name,
          subtype: _.get(source, 'aml_types', []).join(','),
          countryCodes: _.get(source, 'country_codes', []),
          date: _.get(source, 'listing_started_utc', null),
          deletedDate: _.get(source, 'listing_ended_utc', null),
          url: _.get(source, 'url', null),
      })
  })

  return _.flatten(out)
