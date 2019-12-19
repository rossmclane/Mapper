const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeometrySchema = new Schema({
  type: String,
  coordinates: Array
});

const FeatureSchema = new Schema({
  type: String,
  id: String,
  properties: Object,
  geometry: GeometrySchema
});

const FeatureCollectionSchema = new Schema({
  type: { type: String, required: true },
  features: [FeatureSchema]
});

const FeatureCollection = mongoose.model(
  "FeatureCollection",
  FeatureCollectionSchema
);

module.exports = FeatureCollection;
