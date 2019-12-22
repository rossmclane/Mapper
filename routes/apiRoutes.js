const router = require("express").Router();
const db = require("../models");

// Map Routes
router.route("/map/:id").get((req, res) => {
  db.UserMap.find({ _id: req.params.id }).then(data => res.json(data));
});

router.route("/user/:username/map").post((req, res) => {
  var username = req.params.username;

  const { featurecollectionID, datasets } = req.body;

  db.UserMap.create({
    featurecollectionID: featurecollectionID,
    datasets: datasets
  })
    .then(function(userMapData) {
      return db.User.findOneAndUpdate(
        { username: username },
        { $push: { usermapIDs: userMapData._id } },
        { new: true }
      );
    })
    .then(data => res.json(data))
    .catch(function(err) {
      res.json(err);
    });
});

router.route("/map/:id").put((req, res) => {
  db.UserMap.updateOne(
    { _id: req.params.id },
    { $set: { datasets: req.body } }
  ).then(response => console.log(response));
});

// User Routes
// router.route("/user/:username").post((req, res) => {
//   db.User.create({
//     username: req.params.username,
//     usermapIDs: []
//   })
//     .then(data => res.json(data))
//     .catch(err => res.json(err));
// });

router.route("/user").post((req, res) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
    usermapIDs: []
  })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.route("/user/:username").get((req, res) => {
  db.User.find({ username: req.params.username }).then(data => res.json(data));
});

module.exports = router;
