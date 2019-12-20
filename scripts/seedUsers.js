const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mapper");

var users = [
  {
    username: "rossmclane",
    maps: []
  },
  {
    username: "daughtrystjohn",
    maps: []
  },
  {
    username: "jimmyfallon",
    maps: []
  }
];

db.User.remove({})
  .then(() => db.User.create(users))
  .then(data => {
    console.log(data);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
