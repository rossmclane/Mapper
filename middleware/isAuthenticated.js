const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = function(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error();
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "superSecretKey");

    console.log(decoded);

    db.User.findOne({ _id: decoded.data }).then(function(dbUser) {
      req.user = dbUser;
      next();
    });
    next();
  } catch {
    res.status(401).json({ message: "Unathorized" });
  }
};
