const mongoose = require("mongoose");
const db = require("../models");

// This is a js object in Geojson Notation
const geojson = require("../client/src/rainfall");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mapper");

console.log(db);

db.FeatureCollection.collection
  .insert(geojson)
  .then(data => {
    console.log(data.result);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
