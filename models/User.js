const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  usermaps: [{ type: Schema.Types.ObjectId, ref: "UserMap" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;