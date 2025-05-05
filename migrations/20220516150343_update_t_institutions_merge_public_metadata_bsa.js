exports.up = knex => knex.schema.raw(`UPDATE institutions SET public_metadata = (public_metadata ||
  '{
    "bsa": {
      "_": {
        "thresholds": [
          {"op": ">=", "val": 7, "risk": "High"},
          {"op": ">=", "val": 5, "risk": "Moderate"},
          {"risk": "Low"}
        ]
      },
      "usCitizen": {
        "order": 0,
        "text": "Are all account owners US citizens\\?",
        "type": "string",
        "subtype": "enum",
        "enum": ["yes", "no"],
        "score": {"no": 2},
        "required": true,
        "default": ""
      },
      "countryOfOrigin": {
        "order": 1,
        "text": "What is your country of origin\\?",
        "type": "string",
