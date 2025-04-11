exports.up = knex => knex.schema.raw(`UPDATE institutions SET public_metadata = (public_metadata ||
  '{
    "bsa": {
      "_": {
        "thresholds": [
          {"op": ">=", "val": 7, "risk": "High"},
