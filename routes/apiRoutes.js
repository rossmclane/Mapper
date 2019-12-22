const router = require("express").Router();
const db = require("../models");

// Map Routes
router.route("/map/:id").get((req, res) => {
  db.UserMap.find({ _id: req.params.id }).then(data => res.json(data));
});

// Gets a user by their username
router.route("/user/:username").get((req, res) => {
  db.User.find({ username: req.params.username }).then(data => res.json(data));
});

// Post a map associated with a user
router.route("/user/:username/map").post((req, res) => {
  var username = req.params.username;

  // Get the featureCollectionID and dataset from the req.body
  const { FeatureCollectionID, Datasets } = req.body;

  db.UserMap.create({
    FeatureCollection: FeatureCollectionID,
    Datasets: Datasets
  })
    .then(function(userMapData) {
      return db.User.findOneAndUpdate(
        { username: username },
        { $push: { usermaps: userMapData._id } },
        { new: true }
      );
    })
    .then(data => res.json(data))
    .catch(function(err) {
      res.json(err);
    });
});

// Post a user with empty usermaps
router.route("/user/:username").post((req, res) => {
  db.User.create({ username: req.params.username, usermaps: [] }).then(data =>
    res.json(data)
  );
});

// Update a usermap
router.route("/map/:id").put((req, res) => {
  db.UserMap.updateOne(
    { _id: req.params.id },
    { $set: { Datasets: req.body } }
  ).then(response => console.log(response));
});

module.exports = router;
