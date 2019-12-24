const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "superSecretKey");

    // the problem is that there isnt a user with that decoded.data
    db.User.findOne({ _id: decoded.data }).then(dbUser => {
      req.user = dbUser;
      next();
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
