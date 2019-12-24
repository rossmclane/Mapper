const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const authware = require("../middleware/authware");

// Get, Post, and Put Map Routes
router
  .route("/map/:id?")
  .get(authware, (req, res) => {
    if (req.user.usermapIDs.includes(req.params.id)) {
      db.UserMap.findOne({ _id: req.params.id }).then(data => {
        res.json(data);
      });
    } else {
      res.status(401).end();
    }
  })
  .post(authware, (req, res) => {
    const { featurecollectionID, datasets } = req.body;

    // This is clunky and weird
    db.UserMap.create({
      featurecollectionID: featurecollectionID,
      datasets: datasets
    }).then(dbUserMap => {
      req.user
        .update({ $push: { usermapIDs: dbUserMap._id } }, { new: true })
        .then(() => res.json(dbUserMap));
    });
  })
  .put(authware, (req, res) => {
    db.UserMap.updateOne(
      { _id: req.params.id },
      { $set: { datasets: req.body } },
      { new: true }
    ).then(response => console.log(response));
  });

// Get and Post User Routes
router
  .route("/user/:username?")
  .post((req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      usermapIDs: []
    })
      .then(data => res.json(data))
      .catch(err => res.json(err));
  })
  .get(authware, (req, res) => {
    db.User.findOne({ username: req.user.username }).then(data =>
      res.json(data)
    );
  });

// Authentication Route
router.route("/authenticate").post((req, res) => {
  db.User.findOne({ username: req.body.username }).then(function(dbUser) {
    if (!dbUser) {
      res
        .status(401)
        .json({ message: "Sorry, your username or password didn't match." });
    }
    if (dbUser.comparePassword(req.body.password)) {
      const token = jwt.sign({ data: dbUser._id }, "superSecretKey");
      res.json({ id: dbUser._id, username: dbUser.username, token: token });
    } else {
      res
        .status(401)
        .json({ message: "Sorry, your username or password didn't match." });
    }
  });
});

module.exports = router;
