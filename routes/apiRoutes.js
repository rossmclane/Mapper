const router = require("express").Router();
const db = require("../models");

// Get request to recipes
router.route("/features").get((req, res) => {
  db.FeatureCollection.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
