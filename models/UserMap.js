const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Need to add user column so that each user map can be associated with a specific user only
const UserMapSchema = new Schema({
  featurecollectionID: {
    type: Schema.Types.ObjectId,
    ref: "FeatureCollection"
  },
  datasets: []
});

const UserMap = mongoose.model("UserMap", UserMapSchema);

module.exports = UserMap;
