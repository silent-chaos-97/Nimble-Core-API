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
        }
      })
  })

  return _.flatten(out)
}

function getFieldByTag(fields, tag) {
  // this will search all tags and count their frequency
  let objMap = fields
    .filter(f => _.has(f, 'tag') && f.tag === tag) // find by tag
    .filter(f => _.has(f, 'value')) // must have value field
    .map(f => f.value) // map value
    .reduce( // get ocurrance frequency
      (map, value) => { map.set(value, (map.get(value) || 0) + 1); return map },
// Temp comment
      new Map()
    )

  if (objMap.size === 0) {
    return null // abort in case of not found
  }

  // break down the search result back into an array 
  // can't use `Object.fromEntries` yet:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
  // we care how many times does a value show up, the more times it shows the more relevant
  const hits = []
  objMap.forEach((frequency, value) => {
    hits.push({ value, frequency })
  })

  // return the value of the item with more frequency
  if (hits && hits.length > 0) {
    return hits.sort((a, b) => a.frequency < b.frequency ? 1 : -1).shift().value
  }

  // else, just return empty string
  return null
