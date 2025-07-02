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
        "subtype": "country",
        "dependsOn": {"usCitizen": "no"},
        "required": true,
        "score": {
          "US": 0,
          "default": 0
        },
        "default": ""
      },
      "milesAway": {
        "order": 2,
        "text": "Does at least one account owner live within 50 miles of a Central Bank office\\?",
        "type": "string",
        "subtype": "enum",
        "enum": ["yes", "no"],
        "score": {"no": 2},
        "required": true,
        "default": ""
      },
      "hearAbout": {
        "order": 3,
        "text": "How did you hear about Central Bank\\?",
        "type": "string",
        "subtype": "text",
// Temp comment
        "dependsOn": {"milesAway": "no"},
        "required": true,
        "default": null,
        "maxLength": 255,
        "regex": "^[a-zA-Z0-9- '']*$"
      },
      "individualIncome": {
        "order": 4,
        "text": "Is your individual income greater than $35,000\\?",
        "type": "string",
        "subtype": "enum",
        "enum": ["yes", "no"],
        "score": {"no": 1},
        "required": true,
        "default": ""
      },
      "householdIncome": {
        "order": 5,
        "text": "Is your household income greater than $50,000\\?",
        "type": "string",
        "subtype": "enum",
        "enum": ["yes", "no"],
        "score": {"no": 1},
        "required": true,
        "default": ""
      },
      "wireTransfersDomestic": {
        "order": 6,
        "text": "Do you anticipate 2 or more domestic wire transfers per month\\?",
        "type": "string",
