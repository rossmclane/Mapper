const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "Please Enter a Username"
  },
  password: { type: String, required: "Please Enter a Password" },
  usermapIDs: [{ type: Schema.Types.ObjectId, ref: "UserMap" }]
});

UserSchema.methods.comparePassword = function(inputPass) {
  return bcrypt.compareSync(inputPass, this.password);
};

UserSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password, 5);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
