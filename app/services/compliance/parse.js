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
// Temp comment
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
