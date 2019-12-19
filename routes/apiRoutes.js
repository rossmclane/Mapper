const router = require("express").Router();
const db = require("../models");

// Get request to recipes
router.route("/features").get((req, res) => {
  db.FeatureCollection.find()
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

router.route("/newmap").post((req, res) => {
  const { FeatureCollectionID, UserID, Datasets } = req.body;

  db.UserMap.create({
    FeatureCollection: FeatureCollectionID,
    Datasets: Datasets
  })
    .then(function(userMapData) {
      return db.User.findOneAndUpdate(
        { _id: UserID },
        { $push: { usermaps: userMapData._id } },
        { new: true }
      );
    })
    .then(data => res.json(data))
    .catch(function(err) {
      res.json(err);
    });
});

// router.route("/user").get((req, res) => {
//   const { FeatureCollectionID, UserID, Datasets } = req.body;

//   db.UserMap.create({
//     FeatureCollection: FeatureCollectionID,
//     Datasets: Datasets
//   })
//     .then(function(userMapData) {
//       return db.User.findOneAndUpdate(
//         { _id: UserID },
//         { $push: { usermaps: userMapData._id } },
//         { new: true }
//       );
//     })
//     .then(data => res.json(data))
//     .catch(function(err) {
//       res.json(err);
//     });
// });

module.exports = router;
