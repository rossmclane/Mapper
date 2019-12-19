const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//

const UserMapSchema = new Schema({
  FeatureCollection: { type: Schema.Types.ObjectId, ref: "FeatureCollection" },
  Datasets: []
});

const UserMap = mongoose.model("UserMap", UserMapSchema);

module.exports = UserMap;
