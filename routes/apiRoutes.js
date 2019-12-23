const router = require("express").Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/isAuthenticated");

// Map Routes
router.get("/map/:id", isAuthenticated, (req, res) => {
  db.UserMap.find({ _id: req.params.id }).then(data => res.json(data));
});

// Post a default map to a user
router.post("/user/:username/map", isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username) {
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
  } else {
    res.json("You don't have access to this route!");
  }
});

// Updating a map
router.put("/map/:id", isAuthenticated, (req, res) => {
  db.UserMap.updateOne(
    { _id: req.params.id },
    { $set: { datasets: req.body } }
  ).then(response => console.log(response));
});

// User Routes
router.post("/user", (req, res) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
    usermapIDs: []
  })
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.get("/user/:username", isAuthenticated, (req, res) => {
  db.User.find({ username: req.params.username }).then(data => res.json(data));
});

// Authentication
router.post("/authenticate", (req, res) => {
  db.User.findOne({ username: req.body.username }).then(function(dbUser) {
    if (!dbUser) {
      res
        .status(401)
        .json({ message: "Sorry, your username or password didn't match." });
    }

    // console.log(dbUser.password);
    // console.log(req.body.password);

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

router.get("/protected", isAuthenticated, (req, res) => {
  res.json(`Welcome ${req.user.username}`);
});

module.exports = router;
